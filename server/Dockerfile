# Step 1: Specify the base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Step 4: Copy the rest of the app's source code
COPY . .

# Step 5: Expose port
EXPOSE 3000

# Step 6: Command to run the app
CMD ["node", "server.js"]
