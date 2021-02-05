import swaggerJsdoc from "swagger-jsdoc";
module.exports = {
  options: swaggerJsdoc({
    swaggerDefinition: {
      info: {
        title: "example-api",
        description: "An example Express API",
        contact: {
          name: "<your name here>",
        },
      },
      //  where to serve the Swagger API page
      servers: [`http://localhost:5000`],
    },
    //  must be referenced from root of the project
    apis: ["src/index.js"],
  }),
};
