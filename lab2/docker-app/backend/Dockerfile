FROM node:18-alpine

WORKDIR .

COPY package.json package-lock.json ./
RUN npm install
RUN npm run create-table

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]