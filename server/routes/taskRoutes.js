const express = require('express');
const { pool } = require("../dbConnect/db");
const DbHelper = require("../dbConnect/dbHelper");
const password = require('secure-random-password');
const router = express.Router();

router.post("/get-tasks", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {mentorid} = req.body;
        const result = await dbHelper.getAssignedTask(mentorid);
        return res.status(200).send(result);
    }catch(error){
        return res.status(400).send({
            message: "Error while getting tasks"
        });
    }finally{
        await dbHelper.releaseClient();
    }
});


router.post("/", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {projectid, student_roll_no, description} = req.body;
        const result = await dbHelper.assignTask(projectid, student_roll_no, description);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while adding task");
    }finally{
        await dbHelper.releaseClient();
    }
});

router.post("/update-task", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {projectid, student_roll_no, description} = req.body;
        const result = await dbHelper.updateTask(projectid, student_roll_no, description);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while updating task");
    }finally{
        await dbHelper.releaseClient();
    }
});

router.post("/delete-task", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {projectid, student_roll_no} = req.body;
        const result = await dbHelper.deleteAssignedTask(projectid,student_roll_no);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while deleting task");
    }finally{
        await dbHelper.releaseClient();
    }
})

module.exports = router;

