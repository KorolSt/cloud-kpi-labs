 
FROM node:18 AS build
 
WORKDIR /
 
COPY package.json package-lock.json ./
RUN npm install
 
COPY . .
 
RUN npm run build
 
FROM node:18
 
WORKDIR / 
 
RUN npm install -g serve
 
COPY --from=build /build /build
 
EXPOSE 3000
 
CMD ["serve", "-s", "build", "-l", "3000"]
