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


router.post("/file", upload.array('file'), async (req, res) => {
    // connect to redis
    // let client = await getRedis();
    // client.on('connect',(req,res)=>{
    //     console.log('Redis Connected');
    // })
    
    const asdf = req.body;
    // console.log("req.body", JSON.stringify(req.body));
    console.log("body: ",req.body)
    // use variable to save req.body
    
    // let file=req.body;
    // file={
    //     issdir:false,
    //     fileName : req.body.uid,
    //     parent : null,
    //     children: [null]
    // }

    // console.log(req.body.file);
    // console.log(file);
    //let path=req.body.relativePath;
    // console.log("path: ",path);
    // let userid = req.body.userid;
    // console.log("userid: ",userid);
    // then push to Redis Cache
    // let a = await files.postfile(file,path,userid)
    // client.hmset(id,[
    //     "fileName",fileName,
    //     "parent", parent,
    //     "children", children
    // ],function(err,reply){
    //     if(err){
    //         console.log(err);
    //     }
    //     // console.log(req.body)
    // })
    console.log("Hey");
    console.log("Body : ",req.body);
    console.log("Files : ",req.files);
    
    try{
    files.postfile(req.files,req.body.relativePath,req.body.userid);
    }catch(e)
    {
        console.log(e);
        res.sendStatus(404);
    }
    console.log("Done");
    res.sendStatus(200);
  });

router.get("/files", async (req,res)=>{
    let fid=req.body.filename;
    let uid=req.body.userid;
    let file = await files.fetchfile(uid,fid);

    res.send(file);
});

router.delete("/file", async (req,res)=>{
    let uid = req.body.uid;
    let filename = req.body.filename;

    let file= await files.deletefile(filename,uid);
});

router.post("/registerroot",async (req,res)=>{
    let uid = req.body.uid;
    console.log("body: ",req.body)
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
fetchfiles  -> const res = await axios.get(`http://localhost:5000/api/fileService/`, formData)    //(formData={userid:userid,filename:filename}) 
deletefile  -> const res = await axios.delete(`http://localhost:5000/api/fileService/file`, formData)    //(formData={uid:userid,filename:filename}) 
*/