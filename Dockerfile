# Stage 1: Build the application
FROM node:latest AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:latest

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy built application from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the application port
EXPOSE 4008

# Command to run the application
CMD ["node", "dist/main"]
