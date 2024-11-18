# Use the official Node.js image as the base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if exists)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's code
COPY . .

# Expose the app's port
EXPOSE 5000

# Run migrations and start the application
CMD ["sh", "-c", "npm run migrate:up && node app.js"]
