const express = require('express');
const app = express();
const { routes } = require('./paths');

for(let i in routes) {
    app.get(i, (req,res)=> {
        res.send(routes[i]);
    });
}

app.post('/users', (req,res) => {
    console.log(req .body);
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