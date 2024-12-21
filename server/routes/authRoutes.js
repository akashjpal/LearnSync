// Suggested code may be subject to a license. Learn more: ~LicenseLog:1680727077.
const express = require('express');
const { pool } = require("../dbConnect/db");
const DbHelper = require("../dbConnect/dbHelper");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    const existingUser = await dbHelper.getUser(email);
    if (existingUser) {
        return res.send({
            messgae: "User Already Exist! Try to Login",
            status: 400
        });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await dbHelper.addUser(username, email, hashedPassword);
    if (result) {
        return res.send({
            messgae: "User Added Successfully",
            status: 200
        });
    }
    await dbHelper.releaseClient();
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    const existingUser = await dbHelper.getUser(email);
    if (!existingUser) {
        return res.send({
            messgae: "User does not Exist! Try to Signup",
            status: 400
        });
    }
    console.log(existingUser);
    const hashedPassword = await bcrypt.compare(password, existingUser.passwordhash);
    if (!hashedPassword) {
        return res.send({
            messgae: "Password is Incorrect",
            status: 400
        });
    }
    return res.send({
        messgae: "User Login Successfully",
        status: 200
    });
});

module.exports = router;