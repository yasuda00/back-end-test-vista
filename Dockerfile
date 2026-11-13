# ==========================================
# Stage 1: Build stage
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install OpenSSL required by Prisma
RUN apk add --no-cache openssl

# Install all dependencies (including devDependencies for build)
COPY package*.json ./
RUN npm ci

# Copy configurations and source code
COPY prisma ./prisma
COPY prisma7.config.ts ./
COPY tsconfig.json ./
COPY src ./src

# Generate Prisma Client and compile TypeScript
RUN npm run build

# ==========================================
# Stage 2: Production runner stage
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install OpenSSL required by Prisma
RUN apk add --no-cache openssl

# Install production dependencies and tsx for execution
COPY package*.json ./
RUN npm ci --omit=dev && npm install -g tsx

# Copy Prisma schema and configuration
COPY prisma ./prisma
COPY prisma7.config.ts ./

# Copy compiled JavaScript from builder stage
COPY --from=builder /app/dist ./dist

# Run as non-root user for security
USER node

EXPOSE 3000

CMD ["npm", "start"]
