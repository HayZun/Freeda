FROM node:14-alpine

WORKDIR /app

COPY src/ ./src/
COPY public/ ./public/
COPY pack*.json ./
COPY create-env-file.sh ./create-env-file.sh

RUN npm install 
RUN npm install -g react-scripts
RUN npm install -g serve

ARG REACT_APP_BACKEND_URL

RUN sh create-env-file.sh REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
RUN npm run build

EXPOSE 3000

CMD ["serve","-s", "build", "-l", "3000"]