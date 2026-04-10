# Stage 1: Install dependencies
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Run app (lightweight)
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 5000

CMD ["npx", "nodemon", "src/index.js"]
