const express = require('express');
const { pool } = require("../dbConnect/db");
const DbHelper = require("../dbConnect/dbHelper");
const { route } = require('./authRoutes');
const router = express.Router();

router.post("/assign-project-students", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {project_id,student_roll_no} = req.body;
        console.log(req.body);
        const result = await dbHelper.assignProject(project_id,student_roll_no);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while adding student");
    }finally{
        await dbHelper.releaseClient();
    }
});

router.post("/delete-assigned-project", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {project_id} = req.body;
        const result = await dbHelper.deleteAssignedProject(project_id);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while deleting student");
    }finally{
        await dbHelper.releaseClient();
    }
});

router.post("/get-tasks", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {project_id} = req.body;
        console.log(req.body);
        const result = await dbHelper.getAssignedTask(project_id);
        return res.status(200).send(result);
    }catch(error){
        return res.status(400).send({
            message: "Error while getting tasks"
        });
    }finally{
        await dbHelper.releaseClient();
    }
})

router.post("/add-task", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {project_id, student_roll_no, description} = req.body;
        const result = await dbHelper.assignTask(project_id, student_roll_no, description);
        return res.status(200).send(result);
    }catch(error){
        console.log(error);
        console.log("Error while adding task");
        return res.status(400).send({
            message: "Error while adding task"
        });
    }finally{
        await dbHelper.releaseClient();
    }
});

router.post("/delete-task", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {project_id,student_roll_no} = req.body;
        const result = await dbHelper.deleteAssignedTask(project_id,student_roll_no);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while deleting task");
    }finally{
        await dbHelper.releaseClient();
    }
});

router.post("/edit-task", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {project_id, student_roll_no, description} = req.body;
        const result = await dbHelper.editTask(project_id, student_roll_no, description);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while editing task");
    }finally{
        await dbHelper.releaseClient();
    }
});


module.exports = router;

