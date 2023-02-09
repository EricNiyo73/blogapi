import swaggerJSDoc from "swagger-jsdoc";
const loginOptions = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: "Login API",
      version: "1.0.0",
      description: `<h3>API documentation for the login and profile routes</h3>
           </h4> If user already signed up he or she must login in order to read and comment on blog. he/she can view his/ her profile once he loggend in</h4>`,
    },
    host: "localhost:5000",
    basePath: "/login",
    schemes: ["http"],
  },
  apis: ["../routes/auth.js"], 
  
};

const userOption = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: "User API",
      version: '1.0.0',
      description: `<h3>A simple User API which post a user , get all users, delete user an</h3>
        <h4>If user doesn't have an acount , can not do anything</h4>`,
    },
    url: "http://localhost:5000/",
  },
  apis: ["../routes/posts.js"], 
};


const blogOption = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: "Blog API",
      version: '1.0.0',
      description: `<h3> this is API for managing blog posts and comments </h3><br>`,
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["../routes/posts.js"], 
};

export const loginSpec = swaggerJSDoc(loginOptions);
export const userSpec = swaggerJSDoc(userOption);
export const blogSpec = swaggerJSDoc(blogOption);

// const options = {
//   swaggerDefinition: {
//       openapi: '3.0.0',
//       info: {
//           title: 'My APIs documentation',
//           version: '1.0.0',
//           description: 'This is my API documentation'
//       },
//       components: {
//           securitySchemes: {
//               bearerAuth: {
//                   type: 'http',
//                   scheme: 'bearer',
//                   in: 'header',
//                   bearerformat: 'JWT',
//               }
//           }
//       },
// ,
//       securit: [{
//           bearerAuth: []
//       }],
//       servers: [{
//           url: 'http://localhost:3000'
//       }]
      
//   },
//   apis: ['route/*.js','module/*.js'],
// }