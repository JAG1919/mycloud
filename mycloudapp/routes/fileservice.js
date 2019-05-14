const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const upload = multer({dest: './uploads/'});
const files = require("../data/postfile")

router.get('/', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});
router.post("/file", upload.array('file'), (req, res) => {
    const asdf = req.body;
    console.log("req.body", JSON.stringify(req.body))
    console.log(asdf)
    // asdf[0].isdir = true;
    // console.log("request:", asdf);
    res.sendStatus(200)
  });

router.get("/files", async (req,res)=>{
    let fid=req.body.fileid;
    let uid=req.body.userid;
    console.log(fid);
    let file = await files.fetchfile(uid,fid);

    res.json(file);
});
// router.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

let asdf="hi";
let asdf1 = `asdf is ${asdf}`;

module.exports = router;