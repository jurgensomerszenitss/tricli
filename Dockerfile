# -------- Base --------
FROM node:alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# -------- Dependencies --------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# -------- Build --------
FROM base AS builder
WORKDIR /app

# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build Next.js
RUN npm run build

# -------- Runtime --------
FROM node:alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Install production deps only
RUN npm ci --omit=dev

# Copy build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

EXPOSE 3000
CMD ["npm", "start"]