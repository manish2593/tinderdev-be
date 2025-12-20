const app = require('./config/server');
const connectDB = require('./config/database');
const {
    DATABASE_NAME,
    PORT
} = require("./variables");
const UserModel = require('./models/user');
const {
    validateSignupFields
} = require('./utils/validator');
const {
    signupPayload
} = require('./generators/signup');

app.post('/signup', async (req, res) => {
    try {
        if (!validateSignupFields(req.body)) {
            throw new Error("Invalid Singup Data.");
        }
        const payload = await signupPayload(req);
        const user = new UserModel(payload);
        const dbResp = await user.save();

        res.status(200).send({
            message: "User got created successfully.",
            data: dbResp
        });
    } catch (err) {
        res.status(400).send("Request failed with err: " + err.message);
    }
})

// find user by email
app.get('/user', async (req, res) => {
    try {
        const user = await UserModel.find({
            email: req.body.email
        });
        res.status(200).send({
            user
        });
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})

// fetch all users
app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).send(users);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})

// update a user find findByIdAndUpdate
app.patch('/users/:userId', async (req, res) => {
    try {
        if (!validateSignupFields(req.body)) {
            throw new Error("Bad Request. Please check payload.");
        }

        const user = await UserModel.findByIdAndUpdate(req.params.userId, req.body, {
            returnDocument: 'after',
            lean: true,
            runValidators: true
        })
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send("User update failed " + err.message);
    }
})

// update a user by findOneAndDelete
app.put('/users', async (req, res) => {
    try {
        const user = await UserModel.findOneAndUpdate({
            _id: req.body.userId
        }, req.body, {
            returnDocument: 'after',
            lean: true,
            runValidators: true
        })
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})


// Delete a user
app.delete('/users', async (req, res) => {
    const user = await UserModel.findByIdAndDelete(req.body.userId)
    res.send("User delected successfully.")
})

connectDB().then(() => {
    console.log(`connected to database ${DATABASE_NAME} successfully`)
    app.listen(PORT, () => console.log(`Started server at ${PORT}`));
}).catch((err) => {
    console.log(err.message);
})