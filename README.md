# Book Management

## Description

The **bookmanagement** project is a Node.js application for managing books. It provides features such as user authentication, book storage, and more.

## Installation

Before running the application, make sure you have Node.js and npm installed. Then, follow these steps:

```bash
git clone https://github.com/rijanacharya/BookManagement.git
cd bookmanagement
npm install
```

## Usage
To start the application, run the following command:
```bash
npm start
```

The application will be accessible at http://localhost:3000.


## Dependencies
- bcrypt: Library for hashing passwords.
- body-parser: Middleware for handling request bodies.
- connect-mongodb-session: MongoDB session store for Express.
- ejs: Templating engine for generating HTML markup.
- express: Web framework for Node.js.
- express-session: Middleware for managing sessions in Express.
- fs: File system module.
- fs.promises: Promisified version of the file system module.
- mongodb: MongoDB driver for Node.js.
- mongoose: MongoDB object modeling for Node.js.
- multer: Middleware for handling file uploads.
- path: Utility for working with file and directory paths.

# Mongoose Models

## Book Model

The `Book` model defines the structure of a book document in the MongoDB collection. Here are the key properties:

- `title`: String (required)
- `details`: String (required)
- `author`: String (required)
- `genre`: String
- `quantity`: Number (default: 0)
- `price`: Number (required)
- `publishedDate`: Date
- `publisher`: String
- `reviews`: Array of references to the `Review` model
- `image`: Object with `data` (Buffer) and `contentType` (String) properties

## Customer Model

The `Customer` model defines the structure of a customer document in the MongoDB collection. Here are the key properties:

- `username`: String (required, unique)
- `password`: String (required)
- `email`: String (required, unique)
- `role`: String, enum: ['customer', 'admin'] (default: 'customer')

## Cart Model

The `Cart` model defines the structure of a shopping cart document in the MongoDB collection. Here are the key properties:

- `userId`: Reference to the `User` model (required)
- `items`: Array of objects with `bookId` (Reference to `Book` model, required) and `quantity` (Number, required, default: 0)

## Order Model

The `Order` model defines the structure of an order document in the MongoDB collection. Here are the key properties:

- `customer`: Reference to the `Customer` model (required)
- `books`: Array of references to the `Book` model (required)
- `orderDate`: Date (default: Date.now)
- `status`: String, enum: ['placed', 'shipped', 'delivered'] (default: 'placed')

## Review Model

The `Review` model defines the structure of a review document in the MongoDB collection. Here are the key properties:

- `customer`: Reference to the `Customer` model (required)
- `content`: String (required)


## License
- This project is licensed under the ISC License.
