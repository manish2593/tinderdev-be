const PORT = 7777;
const ADMIN_TOKEN = "manish";
const DATABASE_URI = 'mongodb+srv://manishparmar2593_db_user:zSDTvd3T9S9pTXMc@tinderweb.mnruwpw.mongodb.net/';
const DATABASE_NAME = 'TinderDev';
const SIGNUP_FIELDS = [
    "firstName",
    "lastName",
    "age",
    "email",
    "password",
    "phone",
    "gender",
    "address",
    "skills"
]

const PHONE_COUNTRY_CODE = 'en-IN';

const ERROR_MESSAGES = {
    email: "Email is not valid",
    phone: "Please enter valid phone number",
    password: "Please enter a strong password",
    skills: "More than 10 skills are not allowed.",
    address: "Please enter address less to 100 char.",
    lastName: "Please enter valid lastname.",
    firstName: "Please enter valid firstname."
}
const GENDER_ENUM = ['male', 'female'];
const JWT_SECRET = "@Dev!!Tinder@BE";
const UNAUTHORISED_PATH = ['/login', '/signup'];
const PASS = 'pass';
const LIKE = 'like';
const REJECT = 'reject';
const ACCEPT = 'accept';
const USER_FIELDS = ['firstName', 'lastName', 'age', 'gender', 'skills'];
const CONNECTION_SEND_STATUS = [PASS, LIKE, REJECT, ACCEPT];
const CONNECTION_REVIEW_STATUS = [REJECT, ACCEPT];
module.exports = {
    PORT,
    USER_FIELDS,
    JWT_SECRET,
    UNAUTHORISED_PATH,
    ADMIN_TOKEN,
    DATABASE_URI,
    DATABASE_NAME,
    SIGNUP_FIELDS,
    ERROR_MESSAGES,
    GENDER_ENUM,
    PHONE_COUNTRY_CODE,
    ACCEPT,
    REJECT,
    PASS,
    LIKE,
    CONNECTION_SEND_STATUS,
    CONNECTION_REVIEW_STATUS
}