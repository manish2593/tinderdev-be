const express = require('express');
const app = express();
const { routes } = require('./paths');
app.use(express.json());

for(let i in routes) {
    app.get(i, (req,res)=> {
        console.log(req.query)
        res.send(routes[i]);
    });
}

app.post('/users', (req,res) => {
    console.log(req.body);
    res.send("User data has been saved successfully.")
});

app.put('/user/:id', (req,res) => {
    res.send("User data has been updated successfully.")
});

app.delete('/user/:id', (req,res) => {
    res.send("User has been deleted successfully.")
});

app.listen(7777, () => {
    console.log("Listening at 7777");
})


// Use multiple route handlers
app.get("/", (req,res, next) => {
    console.log("Handler 1");
    // res.send("Sending Response from handler 1");
    next();
}, (req, res, next) => {
    res.send("Sending Response from handler 2");
    console.log("Handler 2");
})

// Use multiple route as array
const handlers = [
    (req,res, next) => {
        console.log("Handler 1");
        // res.send("Sending Response from handler 1");
        next();
    }, (req, res, next) => {
        // res.send("Sending Response from handler 2");
        next();
        console.log("Handler 2");
    },(req, res, next) => {
        res.send("Sending Response from handler 3");
        console.log("Handler 3");
    }
]
app.get("/abc", handlers)