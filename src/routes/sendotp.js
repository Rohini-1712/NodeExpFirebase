const express = require('express');
const sendOtprouter  = express.Router(); 
const otpToUser = require("../controllers/sendOtp");
sendOtprouter.route("/").post(otpToUser);
module.exports = sendOtprouter;
