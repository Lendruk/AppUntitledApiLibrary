FROM node:13-slim
WORKDIR /build
COPY package*.json /build/
RUN npm install
COPY . /build
RUN echo "REACT_APP_USING_DOCKER=true" >> .env
CMD ["npm", "run-script", "build"]