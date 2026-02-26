# -------- Builder --------
FROM node:alpine AS base
WORKDIR /app
# ENV NODE_ENV=production

# -------- Build --------
FROM base AS builder
WORKDIR /app 
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install project dependencies with frozen lockfile for reproducible builds
RUN \
  if [ -f package-lock.json ]; then npm install; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
  else npm install; \
  fi 
 
# Copy source
COPY . . 

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build standalone output
RUN npm run build


# -------- Runtime --------
FROM node:alpine AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Install production deps only
# RUN npm install

# Copy build output
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/next.config.ts ./

# Copy standalone output only
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

EXPOSE 3000
# CMD ["npm", "start"]

CMD ["node", "server.js"]