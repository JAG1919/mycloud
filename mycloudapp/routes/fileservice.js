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

router.get('/', async (req,res)=>{
    let client = await getRedis();
    client.on('connect',(req,res)=>{
        console.log("Redis Connected");
    })
    var list = ["item1", "item2", "item3"];
    res.json(list);
    // get list from Redis Cache
    client.hgetall(list);
    console.log('Sent list of items');
});

router.post("/file", upload.array('file'), versioncontrol, async (req, res) => {
    // connect to redis
    let client = await getRedis();
    client.on('connect',(req,res)=>{
        console.log('Redis Connected');
    })
    const asdf = req.body;
    console.log("req.body", JSON.stringify(req.body));
    console.log(asdf)
    // use variable to save req.body
    let id = req.body.id;
    let fileName = req.body.fileName;
    let parent = req.body.parent;
    let children = req.body.children;
    // then push to Redis Cache
    client.hmset(id,[
        "fileName",fileName,
        "parent", parent,
        "children", children
    ],function(err,reply){
        if(err){
            console.log(err);
        }
        console.log(req.body)
    })
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