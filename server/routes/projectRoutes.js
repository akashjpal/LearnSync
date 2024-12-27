const express = require('express');
const { pool } = require("../dbConnect/db");
const DbHelper = require("../dbConnect/dbHelper");
const password = require('secure-random-password');
const router = express.Router();

router.post("/get-projects", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {mentorid} = req.body;
        const result = await dbHelper.getAllProjects(mentorid);
        return res.status(200).send(result);
    }catch(error){
        return res.status(400).send({
            message: "Error while getting projects"
        });
    }finally{
        await dbHelper.releaseClient();
    }
})

router.post("/add-project", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {name, description, mentorid} = req.body;
        const result = await dbHelper.addProject(name, description, mentorid);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while adding project");
    }finally{
        await dbHelper.releaseClient();
    }
});

router.post("/update-project", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {project_id,name, description, mentorId} = req.body;
        const result = await dbHelper.updateProject(project_id,name, description, mentorId);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while updating project");
    }finally{
        await dbHelper.releaseClient();
    }
});

router.post("/delete-project", async (req, res) => {
    const client = await pool.connect();
    const dbHelper = new DbHelper(client);
    try{
        const {project_id} = req.body;
        const result = await dbHelper.deleteProject(project_id);
        res.send(result);
    }catch(error){
        console.log(error);
        console.log("Error while deleting project");
    }finally{
        await dbHelper.releaseClient();
    }
});


module.exports = router;

