class DbHelper{
    constructor(client){
        this.client = client;
    }
    async getUser(email) {
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@gmail.com";
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
      
        try {
          // Handle admin email
          if (email === ADMIN_EMAIL) {
            return { role: "admin", data: {email:ADMIN_EMAIL,password:ADMIN_PASSWORD} };
          }
      
            // Query student table
            const studentResult = await this.client.query(
                "SELECT * FROM student WHERE email = $1",
                [email]
            );

            if (studentResult.rows.length > 0) {
                return { role: "student", data: studentResult.rows[0] };
            }

            // Query mentor table
            const mentorResult = await this.client.query(
                "SELECT * FROM mentor WHERE email = $1",
                [email]
            );

            if (mentorResult.rows.length > 0) {
                return { role: "mentor", data: mentorResult.rows[0] };
            }
            // If no result is found, return null
            return null;
        } catch (error) {
          console.error("Error fetching user:", error);
          throw new Error("Failed to fetch user from the database");
        }
      }
      
    // async addUser(email,password){
    //     try{
    //         const result = await this.client.query("INSERT INTO userInfo (email,passwordhash) VALUES ($1,$2)",[email,password]);
    //         console.log(result);
    //         return result;
    //     }catch(error){
    //         console.log(error);
    //         console.log("Error while adding user");
    //     }
    // }

    async addStudent(roll_no, name, course,email,password){
        try{
            const result = await this.client.query("INSERT INTO student (roll_no, name, course,email,password) VALUES ($1,$2,$3,$4,$5)",[roll_no, name, course,email,password]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while adding student");
        }
    }

    async getAllStudents(){
        try{
            const result = await this.client.query("SELECT * FROM student");
            console.log(result.rows);
            return result.rows;
        }catch(error){
            console.log(error);
        }
    }

    async getStudent(roll_no){
        try{
            const result = await this.client.query("SELECT * FROM student WHERE roll_no = $1",[roll_no]);
            console.log(result.rows[0]);
            return result.rows[0];
        }catch(error){
            console.log(error);
        }
    }

    async deleteStudent(roll_no){
        try{
            const result = await this.client.query("DELETE FROM student WHERE roll_no = $1",[roll_no]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while deleting student");
        }
    }

    async updateStudent(roll_no, name, course,email,password){
        try{
            const result = await this.client.query("UPDATE student SET name = $2, course = $3, email=$4, password=$5 WHERE roll_no = $1",[roll_no, name, course,email,password]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while updating student");
        }
    }

    async getAllMentors(){
        try{
            const result = await this.client.query("SELECT * FROM mentor order by mentorId asc");
            console.log(result.rows);
            return result.rows;
        }catch(error){
            console.log(error);
        }
    }

    async addMentor(mentorId, name, department, email,password){
        try{
            const result = await this.client.query("INSERT INTO mentor (mentorId, name, department,email,password) VALUES ($1,$2,$3,$4,$5)",[mentorId, name, department,email,password]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while adding mentor");
        }
    };

    async assignMentor(mentorId, student_roll_no){
        try{
            const result = await this.client.query("UPDATE student SET mentorid = $1 WHERE roll_no = $2",[mentorId, student_roll_no]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while assigning mentor");
        }
    }

    async getMentor(mentorId){
        try{
            const result = await this.client.query("SELECT * FROM mentor WHERE mentorId = $1",[mentorId]);
            console.log(result.rows[0]);
            return result.rows[0];
        }catch(error){
            console.log(error);
        }
    }

    async deleteMentor(mentorId){
        try{
            const result = await this.client.query("DELETE FROM mentor WHERE mentorId = $1",[mentorId]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while deleting mentor");
        }
    }

    async updateMentor(mentorId, name, department,email,password){
        try{
            const result = await this.client.query("UPDATE mentor SET name = $2, department = $3, email=$4, password=$5 WHERE mentorId = $1",[mentorId, name, department,email,password]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while updating mentor");
        }
    }

    // To handle Projects
    async addProject(name, description,mentorId){
        try{
            const result = await this.client.query("INSERT INTO project ( name, description,mentorId) VALUES ($1,$2,$3)",[ name, description,mentorId]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while adding project");
        }
    }
    async editProject(project_id, name, description,mentorId){
        try{
            const result = await this.client.query("UPDATE project SET name = $2, description = $3, mentorId=$4 WHERE project_id = $1",[project_id, name, description,mentorId]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while updating project");
        }
    }
    async getProject(project_id){
        try{
            const result = await this.client.query("SELECT * FROM project WHERE project_id = $1",[project_id]);
            console.log(result.rows[0]);
            return result.rows[0];
        }catch(error){
            console.log(error);
        }
    }
    async deleteProject(project_id){
        try{
            const result = await this.client.query("DELETE FROM project WHERE project_id = $1",[project_id]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while deleting project");
        }
    }
    async getAllProjects(mentorId){
        try{
            const result = await this.client.query("SELECT * FROM project WHERE mentorId = $1",[mentorId]);
            console.log(result.rows);
            return result.rows;
        }catch(error){
            console.log(error);
        }
    }


    // To assign projects to students
    async assignProject(project_id, student_roll_no){
        try{
            const result = await this.client.query("INSERT INTO project_student (project_id, student_roll_no) VALUES ($1,$2)",[project_id, student_roll_no]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log(" Error while assigning project");
        }
    }
    async getAssignedProject(project_id){
        try{
            const result = await this.client.query("SELECT * FROM project_student WHERE project_id = $1",[project_id]);
            console.log(result.rows[0]);
            return result.rows[0];
        }catch(error){
            console.log(error);
        }
    }
    async deleteAssignedProject(project_id){
        try{
            const result = await this.client.query("DELETE FROM project_student WHERE project_id = $1",[project_id]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while deleting assigned project");
        }
    }

    // To assign tasks to students
    async assignTask(project_id, student_roll_no,description, duedate){
        try{
            const result = await this.client.query("INSERT INTO task (project_id, student_roll_no,description,duedate) VALUES ($1,$2,$3,$4)",[project_id, student_roll_no,description,duedate]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while assigning task");
        }
    }

    async getAssignedStudentTask(student_roll_no){
        try{
            const result = await this.client.query("SELECT * FROM task WHERE task.student_roll_no = $1",[student_roll_no]);
            console.log(result.rows);
            return result.rows;
        }catch(error){
            console.log(error);
        }
    }

    async updateTaskStatus(task_id, status){
        try{
            const result = await this.client.query("UPDATE task SET status = $2 WHERE task_id = $1",[task_id, status]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while updating task status");
        }
    }

    async getAssignedTask(project_id){
        try{
            console.log(project_id);
            const result = await this.client.query("SELECT * FROM task WHERE task.project_id = $1",[project_id]);
            console.log(result.rows);
            return result.rows;
        }catch(error){
            console.log(error);
        }
    }
    async getAssignedTaskWithId(task_id){
        try{
            // console.log("")
            console.log(task_id)
            const result = await this.client.query("SELECT * FROM task WHERE task_id = $1",[task_id]);
            console.log(result.rows[0]);
            return result.rows[0];
        }catch(error){
            console.log(error);
        }
    }
    async editTask(id, description,duedate){
        try{
            console.log(id,duedate,description);
            const result = await this.client.query("UPDATE task SET description = $2, duedate = $3 WHERE task_id = $1",[id, description,duedate]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while updating assigned task");
        }
    }
    async deleteAssignedTask(task_id){
        try{
            const result = await this.client.query("DELETE FROM task WHERE task_id = $1",[task_id]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while deleting assigned task");
        }
    }
    async addGithubLink(project_id, name, description, github_url){
        try{
            const result = await this.client.query("UPDATE project SET github_url = $4, name=$2, description=$3 WHERE project_id = $1",[project_id, name, description, github_url]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while adding github link");
        }
    }

    async updatePasswordStudent(email, password){
        try{
            const result = await this.client.query("UPDATE student SET password = $2 WHERE email = $1",[email, password]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while updating password");
        }
    }

    async updatePasswordMentor(email, password){
        try{
            const result = await this.client.query("UPDATE mentor SET password = $2 WHERE email = $1",[email, password]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while updating password");
        }
    }

    async releaseClient(){
        await this.client.release();
    }

}



module.exports = DbHelper;