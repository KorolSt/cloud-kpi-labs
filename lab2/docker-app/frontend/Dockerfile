# Use the official Node.js image to build the React app
FROM node:18 AS build

WORKDIR /
 
COPY package.json package-lock.json ./
RUN npm install
 
COPY . .
RUN npm run build
 
FROM nginx:alpine
 
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for Render
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
