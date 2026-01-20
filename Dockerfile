# Use official lightweight Node.js image
FROM node:18-slim

# Create app directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy app source
COPY . .

# Cloud Run listens on $PORT
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
