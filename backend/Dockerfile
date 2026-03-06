# Use Node 20
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies only
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Create uploads folder
RUN mkdir -p uploads

# Expose port
EXPOSE 10000

# Start app
CMD ["node", "dist/server.js"]