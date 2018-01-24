const express = require("express");
const bodyParser = require("body-parser");
const model = require("./model/entry");
const action = require("./route/action");
const fileUpload = require("express-fileupload");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(fileUpload());

app.get("/", (req, res) => {
    res.send("What would you like to do?")
});

app.post("/upload", (req, res) => {
    if(!req.files){
        return res.status(400).send("No files uploaded.");
    }
    
    let image = req.files.gambar;
    let keycode = new Date().valueOf();

    image.mv("./public/" + keycode + ".png", function(err){
        if(err){
            return res.status(500).send(err);
        }
        res.send("File uploaded.")
    });
})

app.post("/add", (req, res) => {

    var validEntry = new model.entry(
        req.body.name,
        req.body.price,
        req.body.category,
        "http://localhost:3000/public/image/" + imageName 
    );

    action.addnew(validEntry);
    res.send(validEntry);
});

app.get("/show", (req, res) => {
    res.send(action.fetch());
    // res.send(action.showall());
});

app.get("/detail", (req, res) => {
    res.send(action.detail(req.query.id));
});

app.put("/update", (req, res) => {
    var validEntry = new model.entry(
        req.body.name,
        req.body.price,
        req.body.category,
        req.body.image
    );

    res.send(action.update(validEntry,req.body.id));
});

app.post("/remove", (req, res) => {
    res.send("Bill titled " + action.remove(req.query.id) + " has been deleted.");
});

app.listen(3000);