FROM node:13-slim
WORKDIR /dist
COPY package*.json /dist/
RUN npm install
COPY . /dist
RUN chmod 755 /dist/dockerEnv.sh && /dist/dockerEnv.sh
CMD ["npm", "start"]