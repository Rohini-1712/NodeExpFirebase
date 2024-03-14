const express = require('express');
const verifyOtprouter  = express.Router(); 
const verifyOtp = require("../controllers/verifyOtp");
verifyOtprouter.route("/").get(verifyOtp);
module.exports = verifyOtprouter;
