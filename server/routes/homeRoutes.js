// Suggested code may be subject to a license. Learn more: ~LicenseLog:1680727077.
const express = require('express');
const { pool } = require("../dbConnect/db");
const DbHelper = require("../dbConnect/dbHelper");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;

const router = express.Router();

router.get("/", async (req, res) => {
        console.log(req.cookies.user);
        res.send("Login Page");
});

module.exports = router;