const fileserviceRoutes = require("./fileservice");
const multer = require('multer');
const upload = multer({dest: './uploads/'});


const constructorMethod = app => {
  app.use("/api/fileService/", fileserviceRoutes);

  app.post("/", upload.array('file'), (req, res) => {
    console.log(req.data);
    // const asdf = req.file.fieldname;
    // console.log(asdf + "1");
    // console.log(req.file.filename);
    res.sendStatus(200)
  });

//   app.use("*", (req, res) => {
//     res.status(404).send('Bad Request');
//   });
};

module.exports = constructorMethod;