const express = require('express');
const bodyParser = require("body-parser");

const usersroute = require('./routes/getusers');
const createuserroute = require('./routes/createUser');
const updateUserRoute = require('./routes/updateUser');
const sendOtpToUserRoute = require('./routes/sendotp');
const verifyOtpRoute = require('./routes/verifyOtp');

//const { authCred } = require("./controllers/authcred");
//const { sendEmail } = require("./controllers/sendOtp");
const cors = require("cors")({ origin: true });

const app = express();
const PORT = process.env.PORT || 5050

app.use(express.json());
app.use("/users", usersroute);
app.use("/create", createuserroute);
app.use("/update/id", updateUserRoute);
app.use("/send", sendOtpToUserRoute);
app.use("/verify", verifyOtpRoute);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors);
// app.post("/sendemail", sendEmail);
// app.post("/getcred", authCred);


app.listen(PORT, function () {
console.log(`Demo project at: ${PORT}!`); });