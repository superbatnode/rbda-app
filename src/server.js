const express = require("express"); 
const firebaseApp = require("./firebase.config");
const app = express(); 
app.use(express.json()); 
function main(){
    app.get("/", (req, res)=>res.send("ok"));
}
app.listen(8000, main);