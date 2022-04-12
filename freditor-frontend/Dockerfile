FROM node:lts-alpine
WORKDIR /freditor-frontend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4200
CMD npm run start
