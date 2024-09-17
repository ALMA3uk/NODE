# Service Order Management App

This project demonstrates a Node.js application using Express, Sequelize, MySQL, Passport, HBS, Multer, managed in a Docker environment. The application provides the ability to register, log in and add administrators. Users can create service orders and set prices for them. Anyone can see the list of orders. And administrators can edit and delete any orders.

## Features

- Register, login, and add administrators
- Create and manage service orders
- See the list of orders
- Edit and delete orders as an administrator

## Getting Started

### Prerequisites

To run this project, ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repository, build and run the Docker containers:
    ```bash
    git clone https://github.com/ALMA3uk/NODE.git && cd NODE && docker-compose up --build
    ```

2. Access the app at `http://localhost:3000/orsers`.

### Running the Project

After running `docker-compose up --build`, the database will start first, then the Node app will start on port 3000 after the "Server is running..." message. The app allows users to create and manage service orders, and provides a list of all orders. P.S. If environment variable `NODE_ENV` is set to `development` in the `.env` file, the app will default admin details: `admin`, `admin`.

### Dependencies

- **Node.js**: v20 (Alpine)
- **Express**: v4.19.2
- **Sequelize**: v6.37.3
- **Bcryptjs**: v2.4.3
- **Connect-flash**: v0.1.1
- **Dotenv**: v16.4.5
- **Express-handlebars**: v8.0.1
- **Express-session**: v1.18.0
- **Hbs**: v4.2.0
- **Multer**: v1.4.5-lts.1
- **Mysql2**: v3.11.0
- **Passport**: v0.7.0
- **Passport-local**: v1.0.0

### Docker Services

- **app**: The main Node.js application
- **db**: MySQL 8 database

### License

This project is licensed under the [MIT License](./LICENSE)