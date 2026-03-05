# Use Node.js official image
FROM node:18-alpine

# Set memory limit for npm
ENV NODE_OPTIONS="--max-old-space-size=512"

WORKDIR /app

# Copy ALL files first (simpler approach)
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps --ignore-scripts

# Build TypeScript manually
RUN npx tsc

# Remove dev dependencies after build
RUN npm prune --production

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5001/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start application
CMD ["node", "dist/server.js"]
