const express = require('express');
const createUserrouter  = express.Router(); 
const createUser = require("../controllers/createUser");
createUserrouter.route("/").post(createUser);
module.exports = createUserrouter;

