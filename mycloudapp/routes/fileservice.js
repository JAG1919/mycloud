const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const upload = multer({dest: '../uploads/'});
// var exec = require('child_process').exec;
const shell = require('shelljs');

let versioncontrol = (req,res,next) => {
    // if (shell.exec('./routes/asdf').code !== 0) { 
    //     shell.echo('Error: Git commit failed');
    //     shell.exit(1);
    // }
    shell.exec('./routes/asdf', function(code, stdout, stderr) {
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
      });
    next();
}

router.get('/', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});
router.post("/file", upload.array('file'), versioncontrol, (req, res) => {
    const asdf = req.body;
    console.log("req.body", JSON.stringify(req.body))
    console.log(asdf)
    
    // shell.exec('Users/justin/Documents/College/SIT/Semester2/CS554/mycloud/mycloudapp/routes/asdf');
    // exec('./asdf', function (error, stdOut, stdErr) {
    //     // do what you want!
    // });
    // asdf[0].isdir = true;
    // console.log("request:", asdf);
    res.sendStatus(200)
  });

router.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

let asdf="hi";
let asdf1 = `asdf is ${asdf}`;

module.exports = router;