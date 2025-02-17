# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./

RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the backend port
EXPOSE 1715

# Start the backend server
CMD ["node", "Server.js"]
