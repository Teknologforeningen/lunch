FROM node:14
WORKDIR /opt/app
COPY client/ ./client/
RUN cd client && npm install && npm run build && cd ..

COPY server/ ./server/
RUN cd server && npm install

EXPOSE 5000

CMD cd server && node src/create.js && npm start
