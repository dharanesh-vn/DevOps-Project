# -------- Stage 1: Build --------
FROM node:18-alpine AS builder

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/ .
RUN npm prune --production

# -------- Stage 2: Runtime --------
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 5000

CMD ["node", "src/index.js"]
