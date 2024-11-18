# Use official Node.js image from Docker Hub
FROM node:18

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Build the frontend app
RUN npm run build

# Expose the port the frontend will run on
EXPOSE 8080

# Define the command to serve the app
CMD ["npm", "run", "serve"]
