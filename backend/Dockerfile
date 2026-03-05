# Use Node.js official image
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Create .npmrc for legacy peer deps
RUN echo "legacy-peer-deps=true" > .npmrc

# Install ALL dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 5001

# Start application
CMD ["node", "dist/server.js"]
