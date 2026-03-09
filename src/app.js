const app = require('./config/server');
const connectDB = require('./config/database');

const {
    DATABASE_NAME,
    PORT
} = require("./variables");

const {
    userRouter,
    profileRouter,
    authRouter,
    notificationRouter,
    requestRouter,
    connectionRouter
} = require('./routes/index');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', userRouter);
app.use('/', notificationRouter);
app.use('/', requestRouter);
app.use('/', connectionRouter);

connectDB().then(() => {
    console.log(`connected to database ${DATABASE_NAME} successfully`)
    app.listen(PORT, () => console.log(`Started server at ${PORT}`));
}).catch((err) => {
    console.log(err.message);
})