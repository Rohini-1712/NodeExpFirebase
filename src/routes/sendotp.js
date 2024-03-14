const express = require('express');
const sendOtprouter  = express.Router(); 
const otpToUser = require("../controllers/sendOtp");
sendOtprouter.route("/").get(otpToUser);
module.exports = sendOtprouter;
