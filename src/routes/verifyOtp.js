const express = require('express');
const verifyOtprouter  = express.Router(); 
const verifyOtp = require("../controllers/verifyOtp");
verifyOtprouter.route("/").post(verifyOtp);
module.exports = verifyOtprouter;
