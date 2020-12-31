const express = require("express");
const fs = require("fs");
const app = new express();
const data = require("./data.json");

const validateUserData = (req, res, next) => {
    const body = req.body;
    if(!body.name || !body.age){
        // break the flow.. and return the response..
        res.send({status: false, error: "data not valid"});
    } else {
        next();
    }
}

app.use(express.json({extended: false}));

// A ------->Middleware 1--->Middleware 2---Middleware 3---Middleware 4----> B
// Middleware is nothing but a function... req, res, next


// Get Api
app.get("/", async (req, res) => {
    res.send({name: "annu", work: "developer", institute: "devskool"});
});

// HTTP Verbs -> GET, POST, PUT, DELETE - api method

// GET -> Read
// POST -> Create
// PUT -> Update
// DELETE -> Delete

// CRUD -> Create, Read, Update, Delete

// query -> ? -> url - no secret - limit of length - key/value
// param -> /user/45667/company/999 -> url - no secret - limit of length - value

// body -> anything we can send - almost no limit - secure - any kind of datastructure
// post, put


app.get("/user", (req, res) => {
    // read
    const id = parseInt(req.query.id);
    if(id){
        const user = data.tables.users.filter(user => user.id === id);
        res.send({status: true, user: user});
    } else {
        res.send({status: true, users: data.tables.users});
    }
});

app.post("/user", validateUserData, (req, res) => {
    // create here..
    console.log("request is validated and coming here...");
    let body = req.body;
    const id = data.tables.users.length + 1;
    body = {id, ...body};
    data.tables.users.push(body);
    const updatedData = JSON.stringify(data);
    fs.writeFile("./data.json", updatedData, (err)=>{
        res.send({err, method: "POST"});
    });
});

app.put("/user", (req, res) => {
    // req.body -> id: 1, name or age
    res.send("From PUT");
});

app.delete("/user", (req, res) => {
    // req.query? -> /user?id=3
    res.send("From DELETE");
});

app.listen(4000, () => {
    console.log("running on port: 4000");
});

// routes -> / and /profile
// callback