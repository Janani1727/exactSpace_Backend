const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
   
    message:{
        type: String,
    },
    user:{ 
        type:String,
    },
    like:{
        type:Number
    },
    time:{
        type:String
    }

})

const ChatModel = mongoose.model("chats", chatSchema)

module.exports = {ChatModel}