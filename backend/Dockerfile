# Use Node.js official image
FROM node:18-alpine

WORKDIR /app

# Copy ALL files first (source needed for postinstall build)
COPY . .

# Create .npmrc for legacy peer deps
RUN echo "legacy-peer-deps=true" > .npmrc

# Install dependencies (postinstall will run build)
RUN npm install

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 5001

# Start application
CMD ["node", "dist/server.js"]
