FROM node:latest
RUN mkdir -p /freditor-frontend
ADD . /freditor-frontend
WORKDIR /freditor-frontend
RUN cd /freditor-frontend

RUN npm install -g @angular/cli
RUN npm install
RUN npm update

CMD ["ng", "serve", "--host=0.0.0.0"]
