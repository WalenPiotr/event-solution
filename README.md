# Event Form

This project is solution for recruitment task for Brainhub.

## Live Demo

To view live demo of this app please visit:
http://46.101.246.218:3999/

To view interactive docs (swagger ui) of API visit:
http://46.101.246.218:4000/api

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To run this app you need node and npm installed

To run this app locally you need to start a MongoDB instance and provide appropriate connection string as enviroment variable for service. You can set env variables using `service/development.env` file
You can use provided docker-compose file to start database (`compose.depend.yml`)

### Installing

1. Clone this project
2. To install required packages for service go to `client` directory and run:

```sh
npm install
```

3. To install required packages for service go to `service` directory and run:

```sh
npm install
```

### Launching app

1. To start client go to `client` directory and run: (by default will start on `localhost:3000`)

```sh
npm run start
```

2. To start service go to `service` directory abd: (by default will start on `localhost:4000`)

```sh
npm run start
```

### Testing

1. To run client test go to `client` directory and run:

```sh
npm run test
```

2. To run service test go to `service` directory and run:

```sh
npm run test
```

## Build with

Both client and server are written using Typescript. Down below there is a list which consist the libraries used to create this app.

#### Client:

- react
- redux

#### Server:

- nestjs
- mongoDB

## Deployment

You can also launch this app using docker-compose. See compose.\*\*\*.yml files placed in root directory.

## License

[MIT](https://choosealicense.com/licenses/mit/)
