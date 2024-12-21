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

    async addUser(username,email,password){
        try{
            const result = await this.client.query("INSERT INTO userInfo (username,email,passwordhash) VALUES ($1,$2,$3)",[username,email,password]);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
            console.log("Error while adding user");
        }
    }

    async releaseClient(){
        await this.client.release();
    }
}

module.exports = DbHelper;