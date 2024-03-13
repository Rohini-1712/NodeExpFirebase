const express = require('express');
const updateUserRouter = express.Router();
const updateUser = require("../controllers/updateUser");
updateUserRouter.route("/").patch(updateUser);
module.exports = updateUserRouter;