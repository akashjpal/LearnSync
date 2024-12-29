const express = require('express');
const { pool } = require("../dbConnect/db");
const DbHelper = require("../dbConnect/dbHelper");
const password = require('secure-random-password');
const router = express.Router();


router.get("/get-all-students", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const result = await dbHelper.getAllStudents();
        return res.status(200).send(result);
    }catch(error){
        return res.status(400).send({
            message: "Error while getting students"
        });
    }finally{
        await dbHelper.releaseClient();
    }
});

router.post("/get-student", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {roll_no} = req.body;
        const result = await dbHelper.getStudent(roll_no);
        return res.status(200).send(result);
    }catch(error){
        return res.status(400).send({
            message: "Error while getting student"
        });
    }finally{
        await dbHelper.releaseClient();
    }
})

router.post("/add-student", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {roll_no, name, course, email} = req.body;
        console.log(req.body);
        const randomPassword = await password.randomPassword({ characters: [password.lower,password.upper,password.digits], length: 7});
        await dbHelper.addStudent(roll_no, name, course,email,randomPassword);
        return res.status(200).send({
            message: "Student Added Successfully"
        });
    }catch(error){
        return res.status(400).send({
            message: "Error while adding student"
        })
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

router.post("/delete-student", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {roll_no} = req.body;
        await dbHelper.deleteStudent(roll_no);
        return res.status(200).send({
            message: "Student Deleted Successfully"
        });
    }catch(error){
        return res.status(400).send({
            message: "Error while deleting student"
        });
    }finally{
        await dbHelper.releaseClient();
    }
});

// Mentor related code

router.get("/get-all-mentors", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const result = await dbHelper.getAllMentors();
        return res.status(200).send(result);
    }catch(error){
        return res.status(400).send({
            message: "Error while getting students"
        });
    }finally{
        await dbHelper.releaseClient();
    }
});

router.post("/add-mentor", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {mentorId, name, department, email} = req.body;
        const randomPassword = await password.randomPassword({ characters: [password.lower,password.upper,password.digits], length: 7 });
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
        const {mentorid} = req.body;
        const result = await dbHelper.deleteMentor(mentorid);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while deleting mentor");
    }finally{
        await dbHelper.releaseClient();
    }
});

module.exports = router;

