const express = require("express");
const router = express.Router();
const path = require('path');

router.get('/', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

router.post('/file', (req,res) => {
    // const asdf = req.file;
    // res.json(list);
    // console.log(asdf + "2");
    console.log("Hi");
});

router.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = router;