# Use an official Node runtime as the base image
FROM node:20.5.1 AS build

# Set the working directory in the image
WORKDIR /app

# Copy the package.json and package-lock.json files to the new work directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the image
COPY . .

# Build the project
RUN npm run build

# Create runtime image
FROM nginx:alpine

# Copy the build artifacts from the build image to the runtime image
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]