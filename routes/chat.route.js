const express = require("express");
const { ChatModel } = require("../model/chat.model");
const chatRouter = express.Router();

// request to get all the chats

chatRouter.get("/", async (req, res) => {
    const data= await ChatModel.find()
    res.send(data)
});

//  to post the chat

chatRouter.post("/send", async (req, res) => {
  const users = ["Alan", "Bob", "Carol", "Dean", "Elin"];
  const randomUser = users[Math.floor(Math.random() * users.length)];
 
  const payload = req.body;
  
  try {
    const post = new ChatModel({ user: randomUser, message: payload.message,like:0,time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })});
    await post.save();
    res.send("Successful");
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error: error });
  }
});

// to edit the particular chat

chatRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    await ChatModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ msg: "Updated Successfully" });
  } catch (err) { 
    res.send({ msg: "Something went wrong" });
  }
});

// to delete the particular message

chatRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await ChatModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Deleted Successfully" });
  } catch (err) { 
    res.send({ msg: "Something went wrong" });
  }
});

// to delete all the chats

chatRouter.delete("/clear",async(req,res) => {
  const cleared = await ChatModel.deleteMany({});
  res.send("cleared")
})


// to update the likes count

chatRouter.patch("/like/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    await ChatModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ msg: "Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});



module.exports = {
  chatRouter,
}