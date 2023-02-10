
import swaggerJSDoc from "swagger-jsdoc";
const postRoutes = require("../routes/posts");
const userRoutes = require("../routes/users");
const Authroutes = require("../routes/auth");
// import userRoutes from "./allApis/userSwagga/postUser.js"

const blogOption = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: "Blog API",
      version: '1.0.0',
      description: "<h2>API for managing blog posts and comments commented on a blog</h2><br><h3>API documentation for the login</h3><br><h3> User API where user create account  , get all users, delete user and update her profile</h3>",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], 
};
export const blogSpec = swaggerJSDoc(blogOption);