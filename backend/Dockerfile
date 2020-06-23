FROM node:13-slim
WORKDIR /dist
COPY package.json /dist
RUN npm install
COPY . /dist
CMD ["npm", "start"]