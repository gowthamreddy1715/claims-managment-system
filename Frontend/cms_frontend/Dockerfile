# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./

RUN npm install

# Copy the frontend code and build it
COPY . .
RUN npm run build

# Serve the production build with a simple HTTP server
RUN npm install -g serve
EXPOSE 5173
CMD ["npm", "run", "dev"]
