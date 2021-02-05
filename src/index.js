/** NodeJS Modules */
import path from "path";

/** 3rd Party node Modules */
import express from "express";
import bodyParser from "body-parser";
/* a string validation lib - uncomment to useimport validator from "validator";

/** allow cors for testing ONLY - uncomment if using CORS
 * import cors from "cors";
 */

//  use environment variables in a .env file
import "dotenv/config";
//  API docs
import swaggerUi from "swagger-ui-express";
const swaggerCfg = require("./swagger.cfg.js");

/** mongo & mongoose - uncomment if using Mongo
 * import models, { connectDb } from "./models";
 */

/**
 * Express config
 */
const app = express();
/** serve swagger */

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerCfg.options));
//  end Express config
//  Set Express render engine config
app.set("view engine", "ejs");
app.set("json spaces", 0);
//  request type config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//  serve static content (React app) from ./public
app.use("/", express.static(path.join(__dirname + "/static")));
//  header config
/**
 * TO ENABLE CORS:
 *
 * uncomment these lines
 * app.use(cors())
 * ...
 * app.use(res, res, next) => {
 *   ...
 *   res.header("Access-Control-Allow-Origin", "*");
 * }
 * in header config below
 */
/**
 * ALLOW CORS - DANGER! - UNcomment out when ENabling CORS
 * app.use(cors());
 */
app.use((req, res, next) => {
  //  comment out next line when disabling CORS
  //  res.header("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  res.append("Access-Control-Allow-Headers", "Content-Type");

  next();
});

/** Mongoose methods for Mongo CRUD */

/**
 *
 * @param {string} param1
 * @param {string} param2
 * @param {string} param3
 *
 * An asynchronous method for [something] in Mongo.
 */
async function exampleMongooseDBMethod(param1, param2) {
  try {
    //  try to do something - example create record
    const someMongoValue = models.ExampleModel.create({
      value1: param1,
      value2: param2,
    });
    return someMongoValue;
  } catch (err) {
    //  check for specific error code, return JSON obj
    if (err === "something") {
      return { err, errorStatus: "some status" };
    } else {
      return { err };
    }
  }
}

/** Express Methods */

/**** Serving static files */
/**
 * @swagger
 * /:
 *  get:
 *    summary: Home Page
 *    description: Load the app home page.
 *    responses:
 *      "200":
 *        description: A successfull response
 *      "404":
 *        description: Not found.
 */
/**
 * @api
 * Home route
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/static/index.html`));
});

/**** API methods */
/**
 * @swagger
 * /example-method:
 *  get:
 *    summary: Example Endpoint
 *    description: Call some method by hitting this endpoint.
 *    responses:
 *      "200":
 *        description: A successfull response
 *      "404":
 *        description: Not found.
 *    parameters:
 *      - in: query
 *        name: param1
 *        required: true
 *        schema:
 *          type: string
 *          minLength: 8
 *        description: A `{string}` parameter example.
 */
app.get("/example-method", async (req, res) => {
  //  do something when this end point is hit
});

//  specifies ${port} for app server
const port = process.env.EXTERNAL_API_PORT;

/****
 * @MongoConnection
 * Start app with Mongo DB connection
 */

/** uncomment if using Mongo DB
//  create a DB connection, then start the app
connectDb()
  .then(async () => {
    app.listen(port, () => {
      console.log(`External API listening on ${port}`);
    });
  })
  .catch((err) => console.error(err));
 */

/**** Start app WITHOUT Mongo DB connection */
app.listen(port, () => {
  console.log(`External API listening on ${port}`);
});
