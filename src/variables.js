const PORT = 7777;
const ADMIN_TOKEN = "manish";
const DATABASE_URI = 'mongodb+srv://manishparmar2593_db_user:zSDTvd3T9S9pTXMc@tinderweb.mnruwpw.mongodb.net/';
const DATABASE_NAME = 'TinderDev';
const USER_OBJECT = {
    firstName: "Deepali",
    lastName: "Parmar",
    age: 18,
    password: 'manish@111',
    phone: 9753443555,
    gender: "female",
    address: "Super corridor, indore",
    skills: ["Salesforce", "nodejs"] 
};

module.exports = {PORT, ADMIN_TOKEN, DATABASE_URI, DATABASE_NAME, USER_OBJECT}