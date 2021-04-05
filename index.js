require('dotenv').config();


const server = require('./server');
//testing api
server.use("/", (req, res) => {
    res.send("LeaveApp API works!!!");
  });

const PORT = process.env.PORT || 3300;

server.listen(PORT, () => console.log(`Server is listening at localhost:${PORT}`));
