# LUNCH
A website using a node.js server and a react client written for [Täffä LUNCH](https://lunch.tf.fi)

## Running the application

### Prerequisites
* docker
* docker-compose

To start the application and a postgres database, run
```
docker-compose up
```
The application can be accessed at [localhost:5000](http://localhost:5000)

Environment variables can be defined directly in docker-compose.yml or by using separate .env files for the server and client.