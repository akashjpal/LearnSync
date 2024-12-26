// Suggested code may be subject to a license. Learn more: ~LicenseLog:1680727077.
const express = require('express');
const { pool } = require("../dbConnect/db");
const DbHelper = require("../dbConnect/dbHelper");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;

const router = express.Router();

router.post("/login", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try {
        const { email, password } = req.body;
        const existingUser = await dbHelper.getUser(email);
        if (!existingUser) {
            return res.status(404).send({
                messgae: "User does not Exist! Try to Contact Admin"
            });
        }
        console.log(existingUser);
        console.log(email, password);
        if (existingUser.data.password !== password) {
            return res.status(400).send({
                messgae: "Password is Incorrect"
            });
        }
        // const hashedPassword = await bcrypt.compare(password, existingUser.passwordhash);
        // if (!hashedPassword) {
        //     return res.send({
        //         messgae: "Password is Incorrect",
        //         status: 400
        //     });
        // }

        const loggedIn = jwt.sign(
            { user: existingUser },
            'secret',
            { expiresIn: '1h' }
        );

        res.cookie('user', loggedIn, {
            httpOnly: true,       // Prevent client-side JavaScript access
            secure: false,        // Use true in production (HTTPS required)
            sameSite: 'strict',   // Protect against CSRF
            maxAge: 3600000       // Cookie expiration in milliseconds
        });

        return res.status(200).send({
            messgae: "User Login Successfully",
            user: existingUser
        });
    }
    catch (error) {
        console.log(error);
    } finally {
        await dbHelper.releaseClient();
    }
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