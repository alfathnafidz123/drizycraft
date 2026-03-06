# How to build & deploy
# run script `npm run build`
# run script `docker build --platform linux/amd64 -t registry.quadrakaryasantosa.com/drizy-client:v0.3 .`
# run script `docker push registry.quadrakaryasantosa.com/drizy-client:v0.3`
# =====================
# 1️⃣ BUILDER
# =====================
FROM node:20-alpine AS builder

WORKDIR /app

# WAJIB: install libc6 untuk sharp & swc
RUN apk add --no-cache libc6-compat

COPY package*.json ./

# PENTING: npm ci bukan npm i
RUN npm ci

COPY . .

# DEBUG GUARD (anti exit 127)
RUN node -v && npm -v
RUN ls -la node_modules/.bin || true

RUN npm run build


# =====================
# 2️⃣ RUNNER
# =====================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=768"

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
