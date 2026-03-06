FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies first
RUN npm install

# Copy project files
COPY . .

# Build TypeScript
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --production

# Create uploads folder
RUN mkdir -p uploads

EXPOSE 10000

CMD ["node", "dist/server.js"]