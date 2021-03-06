const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const configRoutes = require("./routes");
const cors = require("cors")

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors())

// An api endpoint that returns a short list of items
// app.get('/api/getList', (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items');
// });

// Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

// app.use("*", (req, res) => {
//     console.log("hi")
//     res.status(404).send('Bad Request');
// });

configRoutes(app);

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);