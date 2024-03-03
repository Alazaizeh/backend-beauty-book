# Use an official Node.js runtime as the base image
FROM node:18.18.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Copy .env file to the container
COPY .env ./

# Run prisma migrate
# RUN npx prisma migrate dev --name init

# Run the testData.js script to add test data
# RUN node testData.js

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]