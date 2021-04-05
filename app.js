const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const bodyParser = require("body-parser");
const compression = require("compression");
const sequelize = require('sequelize');
const cors = require("cors");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 5000;

//parses the request coming into json object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//implementing cors policy
app.use(cors());

const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: {
    service: "staff-service",
  },
  transports: [new winston.transports.Console()],
});
//Defining the App url the swagger should use

// let url = process.env.APP_URL;
let url = "";
if (process.env.NODE_ENV === "development") {
  url = `localhost:${PORT}`;
} else {
  url = process.env.APP_URL;
}

//implementing the Swagger definition
const swaggerDefinition = {
  swagger: "2.0",
  info: {
    version: process.env.APP_VERSION,
    title: `${process.env.APP_NAME} API`,
    description: `API Documentation for ${process.env.APP_NAME}`,
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  host: url,
  basePath: "/api/v1/",
};

const options = {
  swaggerDefinition,
  apis: ["./api/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const shouldCompress = (req, res) => {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
};

//compresses response data to improve server performance and reduce response time
app.use(compression({ filter: shouldCompress }));

const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// authenticate();

//entry route for staff
app.use("/api/v1/staffs", require("./api/staffs/routes"));

app.use((req, res, done) => {
  logger.info(req.originalUrl);
  done();
});

//testing api
app.use("/", (req, res) => {
  res.send("LeaveApp API works!!!");
});

app.listen(PORT, () => {
  console.log("===========================================");
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger url: http://${url}/swagger`);
  console.log(`Swagger Json file: http://${url}/swagger.json`);
  console.log("===========================================");
  console.log("\n");
});

module.exports = app;
