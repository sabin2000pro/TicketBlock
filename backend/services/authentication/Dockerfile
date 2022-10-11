FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY tsconfig.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 5200
RUN npm run build
CMD [ "npm", "run", "start:server" ]