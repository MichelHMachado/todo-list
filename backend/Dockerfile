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

# Expose the backend port
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "start"]
