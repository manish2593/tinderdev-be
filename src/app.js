const express = require('express');
const app = express();
const { routes } = require('./paths');

for(let i in routes) {
    app.use(i, (req,res)=> {
        res.send(routes[i]);
    });    
}

app.listen(7777, () => {
    console.log("Listening at 7777");
})