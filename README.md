# CRUD App

A simple CRUD (Create, Read, Update, Delete) application using Node.js, Express, MongoDB, and React.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Overview

This CRUD app is built with Node.js and Express for the server-side, MongoDB as the database, and React for the front-end. It allows you to perform basic CRUD operations on a collection of users.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- MongoDB
- npm or yarn

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/CRUD-App.git
cd CRUD-App
npm install
cd client
npm start


```

## Usage

1. Open your browser and go to [http://localhost:8000](http://localhost:8000) to access the server.

2. The React app will be running at [http://localhost:3000](http://localhost:3000) by default.

3. Perform CRUD operations on the user data.

## Folder Structure

- **server**: Contains the server-side code.
  - **controllers**: Handles route logic.
  - **models**: Defines MongoDB schema.
  - **routes**: Defines API routes.
  - **services**: Contains business logic for user operations.
  - **index.js**: Main entry point for the server.

- **client**: Contains the React front-end code.

## Dependencies

### Server

- **Express**: Web application framework for Node.js
- **Mongoose**: MongoDB object modeling for Node.js

### Client

- **React**: JavaScript library for building user interfaces
- **React Router**: Declarative routing for React.js

