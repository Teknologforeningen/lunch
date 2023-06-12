FROM node:19 AS react-builder
WORKDIR /lunch

COPY client/package.json .
COPY client/package-lock.json .
RUN npm install

COPY client .
RUN npm run build


FROM node:19-alpine
WORKDIR /lunch/server

COPY --from=react-builder /lunch/build /lunch/client/build

COPY server/package.json .
COPY server/package-lock.json .
RUN npm install

COPY server .

EXPOSE 5000

CMD npm run init && npm start
