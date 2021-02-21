projectData = {};

const port = 3000;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const server = app.listen(port, ()=>{
    console.log('server running');
    console.log(`running on localhost ${port}`);
});

app.use(express.static('website'));

app.post('/setData', (req, res)=>{
    console.log(req.body.temp);
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.feelings = req.body.feelings;
});

app.get('/getData', (req, res) => {
    res.send(projectData);
    console.log(projectData);
});
