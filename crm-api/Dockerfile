# Use Node.js 18 as base image, highest version supported by required libraries
FROM node:18

# Set working directory
WORKDIR /app

# Copy package and package-lock to the working directory
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 4000

# Run application
CMD ["npm", "start"]
