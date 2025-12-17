const {
    isAdmin,
    isAuthenticated
} = require("./middlewares/auth");

const { app } = require('./server');
const { PORT } = require("./variables");

//Using middlewares
app.use('/admin', [isAuthenticated, isAdmin]);
app.use('/users', isAuthenticated);


app.get('/getusers', (req, res, next) => {
    try {
        // throw new Error("Failed intensionally");
        res.status(200).send("All public users fetched.");
    } catch(err){
        throw new Error(err.message)
    }
})

app.get('/users', (req, res) => {
    res.status(200).send("All private users data fetched.");
})

app.get('/users/:id', (req, res) => {
    res.status(200).send(`User with id ${req.params.id} has been fetched.`);
})

app.get('/admin/users', (req, res) => {
    res.status(200).send("All admin users data fetched.");
})

app.delete('/admin/deleteuser', (req, res) => {
    res.status(200).send("Admin delete one user successfully.");
})

app.post('/login', (req, res) => {
    res.status(200).send("Login successfully");
})

app.use('/', (err, req, res, next) => {
    res.status(500).send(`Request failed with ${err.message}`);
});

app.listen(PORT, () => {
    console.log(`Express server started at ${PORT}`)
})