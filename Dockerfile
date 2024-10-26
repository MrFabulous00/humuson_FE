FROM node:16.18.1

RUN mkdir -p /app
WORKDIR /app
ADD ./ /app


RUN npm cache clean --force
RUN npm i -g npm@8.19.3
RUN npm install --verbose
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "npm", "run", "start"]
