// Suggested code may be subject to a license. Learn more: ~LicenseLog:1438614570.
const express = require('express');
const {connectDB,pool} = require("./dbConnect/db");
const app = express();
const port = 3001;

app.get("/auth/signup",(req,res)=>{
  const {username, email, password} = req.body();
  console.log(username, email, password);
  res.send("Hello World!");
})
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
