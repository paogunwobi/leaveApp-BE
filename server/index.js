const express = require('express');

const server = express();
// server.use(express);


//entry route for Staffs
server.use("/api/v1/staff", require("../routes/staffRoute"));

module.exports = server;