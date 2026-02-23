# -------- Base --------
FROM node:alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# -------- Dependencies --------
FROM base AS deps
COPY package.json ./

RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "No lockfile found" && exit 1; \
  fi

# -------- Build --------
FROM base AS builder
# RUN npm init
# COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# -------- Runtime --------
FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Next.js runtime needs these
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# Only copy necessary files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json* ./ 

# Install only production dependencies
RUN npm ci --omit=dev || true

# Copy built Next.js files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

EXPOSE 3000

CMD ["npm", "start"]
