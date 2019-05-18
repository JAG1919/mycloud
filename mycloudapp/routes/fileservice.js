const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const upload = multer({dest: '../uploads/'});
const files = require("../data/postfile")
const shell = require("shelljs");
const getRedis = require('../redis');

let versioncontrol = (req,res,next)=>
{
    shell.exec('./routes/asdf', function(code,stdout,stderr){
    });
    next();
}


router.post("/file", upload.array('file'), (req, res) => {
    
    const asdf = req.body;
    
    console.log("body: ",req.body)
    console.log("Hey");
    console.log("Body : ",req.body);
    console.log("Files : ",req.files);
    
    try{
    files.postfile(req.files,req.body.path,req.body.userid);
    }catch(e)
    {
        console.log(e);
        res.sendStatus(404);
    }
    console.log("Done");
    res.sendStatus(200);
  });

router.post("/files", async (req,res)=>{
    let fid=req.body.filename;
    let uid=req.body.userid;
    //console.log(req);
    console.log(req.body);
    let file = await files.fetchfile(uid,fid);
    console.log(file);
    res.send(file);
});

router.delete("/file", async (req,res)=>{
    let uid = req.body.uid;
    let filename = req.body.filename;

    let file= await files.deletefile(filename,uid);
});

router.post("/registerroot",async (req,res)=>{
    let uid = req.body.uid;
    console.log(uid);
    console.log(req.body);
    let file = await files.makeroot(uid);
    if(file)
        res.sendStatus(200);
    else
        res.sendStatus(404);
});
// router.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

router.post("/move", async(req,res)=>{
    let file = await files.movefile(req.body.fromfile,req.body.tofile,req.body.filename,req.body.userid);
})

let asdf="hi";
let asdf1 = `asdf is ${asdf}`;

module.exports = router;

/*
postfile -> const res = await axios.post(`http://localhost:5000${action}`, formData) 
registerroot -> const res = await axios.post(`http://localhost:5000/api/fileService/registerroot`, formData)    //(formData={uid:userid}) 
fetchfiles  -> const res = await axios.get(`http://localhost:5000/api/fileService/files`, formData)    //(formData={userid:userid,filename:filename}) 
deletefile  -> const res = await axios.delete(`http://localhost:5000/api/fileService/file`, formData)    //(formData={uid:userid,filename:filename}) 
*/