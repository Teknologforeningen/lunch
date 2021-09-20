# LUNCH
A website using a node.js server and a react client written for [Täffä LUNCH](https://lunch.tf.fi) by [Jan Nyberg](https://github.com/Nybbbbe/)


## Prerequisites
* npm
* mongo

Or, alternatively if using Docker
* docker
* docker-compose

## Running LUNCH in development mode
The project requires a running mongo database. To start LUNCH in development mode the client and server can be run separately, guidelines in the respective folders.

## Vars
Variables should be defined for both the client and server, examples can be found in `client/.env.example` and `server/.env.example`

## Deploying LUNCH
An example docker deployment using docker-compose can be found in the project