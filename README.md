# Online Bookstore Project (MEVN Stack)

This is an online bookstore project built using the MEVN stack, which stands for MongoDB (database), Express.js (back-end framework), Vue.js (front-end framework), and Node.js (runtime environment).

The project aims to provide a platform for users to browse and purchase books online. It includes features such as user authentication, book search, book details, shopping cart, and order management.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Features

1. User Authentication:

   - Sign up and login functionality.
   - Secure password hashing and storage.
   - JWT-based authentication for protected routes.

2. Book Search:

   - Search books by title, author, or category.
   - Pagination for large book collections.

3. Book Details:

   - View detailed information about a book, including - title, author, description, price, and availability.
   - Add books to the shopping cart.

4. Shopping Cart:

   - Add/remove books from the cart.
   - Update the quantity of books in the cart.
   - Calculate the total price of items in the cart.

5. Order Management:
   - Place orders for the books in the cart.
   - View order history.
   - Track order status

## Installation

To run the online bookstore project locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/HelloBrijesh/Book-Store-MEVN.git
```

2. Change into the project directory:

```
cd Book-Store-MEVN
```

3. Install the dependencies for both the client and server:

```
cd client && npm install
cd ../server && npm install
```

4. Set up the environment variables:

   - Create a .env file in the server directory.
   - Provide the necessary environment variables as shown in the env-template file.
   - https://www.youtube.com/watch?v=lBRnLXwjLw0 (for generating the 16 digit key from gmail setting for sending the email from nodemailer)

5. Setup the mongodb in the local machine

   - https://www.mongodb.com/try/download/community
   - Add books data from the test.books.json file in mongodb

6. Start the development server:

   - In the server directory, run npm run dev to start the Express.js server.
   - In the client directory, run npm run dev to start the Vue.js development server.

7. Access the application in your browser

## Usage

The online bookstore project provides a web-based user interface for interacting with the application. Users can browse books, search for specific titles or authors, add books to the cart, and place orders.

Make sure the server and client are running locally as explained in the Installation section before using the application.

## Technologies

The online bookstore project is built using the following technologies:

- Vue.js: A progressive JavaScript framework used for building the client-side user interface.
- Vue Router: A routing library for Vue.js
- Pinia: A state management library for Vue.js, used to manage application-level state and handle user authentication.
- Axios: A promise-based HTTP client used to make HTTP requests from the frontend to the backend API.
- Express.js: A fast and minimalist web application framework for Node.js used for building the server-side API.
- Node.js: A JavaScript runtime environment used for running the server application.
- MongoDB: A NoSQL database used for storing book information, user data, and orders.
- Mongoose: An object modeling library for MongoDB used for database operations.
- JSON Web Tokens (JWT): A method for securely transmitting information between parties as a JSON object, used for user authentication and authorization.
- Bcrypt: A library used to hash passwords before storing them in the database, providing secure password storage.

## Contributing

Contributions to this project are welcome! If you find
