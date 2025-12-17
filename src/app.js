const app = require('./config/server');
const connectDB = require('./config/database');
const { DATABASE_NAME, PORT } = require("./variables"); 

connectDB().then(() => {
    console.log(`connected to database ${DATABASE_NAME} successfully`)
    app.listen(PORT, () => console.log(`Started server at ${PORT}`));
}).catch((err) => {
    console.log(err.message);
})