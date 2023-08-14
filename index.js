const express=require("express");
require('dotenv').config();
const connection= require("./db")
const app=express();
const cors=require("cors");

app.use(express.json());
app.use(cors())

const {chatRouter}=require("./routes/chat.route")

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use("/chat",chatRouter)

app.listen(3008,async()=>{
    try {
        
        await connection
        console.log("Connected ");
    } catch (error) {
        console.log(error.message);
    }
   console.log(`sever running at port ${3008}`)
})