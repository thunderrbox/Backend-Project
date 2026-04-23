// require("dotenv").config({ path: "./.env" });//* we are using import pattern and some were we are using require pattern which makes it look inconsistent, but it is not a problem because we are using babel to transpile our code and it will handle the import and require statements properly. We can also use import pattern for all the files and it will work fine, but we are using require pattern for dotenv because it is a common practice to use require for loading environment variables and it is also more concise.
// *hence this problem is being solved and we will be using import pattern for all the files in our project, and we will be using require pattern only for loading environment variables using dotenv package, and it is a common practice to use require for loading environment variables and it is also more concise. We can also use import pattern for loading environment variables, but it is not a common practice and it is also more verbose. Hence we will stick to require pattern for loading environment variables and import pattern for all the other files in our project.

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

import dotenv from "dotenv";
dotenv.config();

connectDB()
  //* as this connectDB is a async function and it returns a promise, we can use then and catch to handle the promise and start the server after the connection is established successfully, and if there is an error in connecting to MongoDB, we can catch the error and log it.
  //*So when successful it will go to ---> .then() and when there is an error it will go to ---> .catch() and we can handle the error in catch block and log it. This way we can ensure that the server starts only after the connection to MongoDB is established successfully, and if there is an error in connecting to MongoDB, we can log the error and exit the process gracefully. This is a common pattern in Node.js applications to handle asynchronous operations and ensure that the application starts properly.

  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(` Server is listening on : ${process.env.PORT || 9000} \n`);
    });

    app.on("error", (error) => {
      console.error("Server error:", error);
    });
  })
  .catch((error) => {
    console.log("Failed in connecting to MongoDB:", error);
  });

//*approach 2
//*in db -> index.js file we will connect to MongoDB and start the server, and we will export a function that will be called in index.js file to start the server.

import express from "express";
const app = express();

//* approach 1
//* it looks like polluted index.js file, but it is the most straightforward way to connect to MongoDB and start the server

// *but we will always go through approach 2 which is more modular and clean, and we will have a separate file for connecting to MongoDB and starting the server, and we will import that file in index.js and used in professional manner .

// * ()();
// //* it is known as iffy (immediately invoked function expression) and it is a common pattern in JavaScript to run code immediately without having to call it explicitly. It is often used for running asynchronous code at the top level of a module, such as connecting to a database and starting a server.

// ;(async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     console.log("Connected to MongoDB");
//     app.on("error", (error) => {
//       console.error("Server error:", error);
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//       console.error("Error connecting to MongoDB:", error);
//       throw error;// * we can also use process.exit(1) to exit the process with a non-zero exit code, which indicates that an error occurred. This is a common practice in Node.js applications to signal that the application failed to start properly. However, throwing the error allows us to see the stack trace and understand where the error occurred, which can be helpful for debugging. In a production environment, you might want to log the error and exit the process gracefully instead of throwing it.
//   }
// })();
