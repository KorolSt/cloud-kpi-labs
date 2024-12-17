FROM node:18-alpine

WORKDIR /vlog-frontend

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3001
CMD ["npm", "start"]
