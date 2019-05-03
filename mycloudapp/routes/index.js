const fileserviceRoutes = require("./fileservice");
const multer = require('multer');
const upload = multer({dest: './uploads/'});
const cors = require("cors")


const constructorMethod = app => {
  app.use("/api/fileService/", fileserviceRoutes);

  // app.post("/", (req, res) => {
  //   // console.log(req.isFile);
  //   // const asdf = req.file.fieldname;
  //   // console.log(asdf + "1");
  //   const asdf = req.body.fiinput;
  //   // console.log(asdf);
  //   res.sendStatus(200)
  // });
  app.post("/test", (req, res) => {
    console.log("we got a request")
    // console.log(req.body)
  })
  app.use("*", (req, res) => {
    res.status(404).send('Bad Request');
  });
};

module.exports = constructorMethod;