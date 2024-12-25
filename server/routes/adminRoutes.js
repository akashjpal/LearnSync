const express = require('express');
const { pool } = require("../dbConnect/db");
const DbHelper = require("../dbConnect/dbHelper");
const password = require('secure-random-password');
const router = express.Router();

router.post("/add-students", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {roll_no, name, course, email} = req.body;
        console.log(req.body);
        const randomPassword = await password.randomPassword({ characters: password.lower, length: 4});
        const result = await dbHelper.addStudent(roll_no, name, course,email,randomPassword);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while adding student");
    }finally{
        await dbHelper.releaseClient();
    }
});

router.post("/update-students", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {roll_no, name, course,email,password} = req.body;
        const result = await dbHelper.updateStudent(roll_no, name, course,email,password);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while updating student");
    }finally{
        await dbHelper.releaseClient();
    }
});

router.post("/delete-students", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {roll_no} = req.body;
        const result = await dbHelper.deleteStudent(roll_no);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while deleting student");
    }finally{
        await dbHelper.releaseClient();
    }
});

router.post("/add-mentor", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {mentorId, name, department, email} = req.body;
        const randomPassword = await password.randomPassword({ characters: password.lower, length: 4 });
        console.log(randomPassword);
        const result = await dbHelper.addMentor(mentorId, name, department, email, randomPassword);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while adding mentor");
    }finally{
        await dbHelper.releaseClient();
    }
});

router.post("/update-mentor", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {mentorId, name, department,email, password} = req.body;
        const result = await dbHelper.updateMentor(mentorId, name, department,email, password);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while updating mentor");
    }finally{
        await dbHelper.releaseClient();
    }
});

router.post("/delete-mentor", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {mentorId} = req.body;
        const result = await dbHelper.deleteMentor(mentorId);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while deleting mentor");
    }finally{
        await dbHelper.releaseClient();
    }
});

module.exports = router;

