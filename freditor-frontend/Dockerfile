FROM node:latest
WORKDIR /freditor-frontend
COPY package.json .
RUN npm install
COPY . .
CMD npm run start
