const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require("mongoose")
const app = express()
const port = 3000

app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended: true
}))
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error', () => console.log("error"));
db.on('open', () => console.log("success"));


app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    }
    db.collection('users').insertOne(data, (err, collection) => {

        if (err) {
            throw err;
        }
        console.log("success")
    });
    return res.redirect('signup_suc.html')
})

app.get('/', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})