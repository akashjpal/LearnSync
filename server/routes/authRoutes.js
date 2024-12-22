// Suggested code may be subject to a license. Learn more: ~LicenseLog:1680727077.
const express = require('express');
const { pool } = require("../dbConnect/db");
const DbHelper = require("../dbConnect/dbHelper");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { email, password,role } = req.body;
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
    const result = await dbHelper.addUser(email, hashedPassword,role);
    await dbHelper.releaseClient();
    if (result) {
        return res.send({
            messgae: "User Added Successfully",
            status: 200
        });
    }
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

    const loggedIn = jwt.sign(
        {user: existingUser}, 
        'secret', 
        { expiresIn: '1h' }
    );

    res.cookie('user', loggedIn, {
        httpOnly: true,       // Prevent client-side JavaScript access
        secure: false,        // Use true in production (HTTPS required)
        sameSite: 'strict',   // Protect against CSRF
        maxAge: 3600000       // Cookie expiration in milliseconds
    });

    await dbHelper.releaseClient();
    return res.send({
        messgae: "User Login Successfully",
        status: 200
    });
});


router.get('/verify-token', async (req, res) => {
    try {
        const token = req.cookies.user;
        console.log(token);
        var decoded = jwt.verify(token, 'secret');
        console.log(decoded);
        res.send({ valid: true, data: decoded, status: 200 });
    } catch (err) {
        res.send({ valid: false, error: 'Invalid token', status: 401 });
    }
});

router.get("/logout", async (req, res) => {
    res.clearCookie('user');
    res.send({
        messgae: "User Logged Out",
        status: 200
    });
});

module.exports = router;