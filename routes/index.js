// const router = require("express").Router();
// const fs = require("fs");

// //let Load all the folders in the router folder as a route
// fs.readdirSync(__dirname, { withFileTypes: true })
//   .filter((dirent) => dirent.isDirectory())
//   .forEach((dir) => {
//     // console.log(`Loading route folder ${dir.name}  ...`);
//     // Mount folder inside router
//     router.use(`/api/v1/${dir.name}`, require(`./${dir.name}/index`));
//   });
// module.exports = router;
