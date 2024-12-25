class DbHelper{
    constructor(client){
        this.client = client;
    }
    async getUser(email){
        try{
            const result = await this.client.query("SELECT * FROM userInfo WHERE email = $1",[email]);
            console.log(result.rows[0]);
            return result.rows[0];
        }catch(error){
            console.log(error);
        }
    }

    async addUser(email,password){
        try{
            const result = await this.client.query("INSERT INTO userInfo (email,passwordhash) VALUES ($1,$2)",[email,password]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while adding user");
        }
    }

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
    async releaseClient(){
        await this.client.release();
    }
}

module.exports = DbHelper;