const express = require("express");
const postdb = require("../models/PostSchema");
const postRouter = express.Router();



postRouter.get("/allpost",async(req,res)=>{
    let allpost = await postdb.find({});
    res.send({msg:"all post",allpost});
})


postRouter.post("/createpost", async (req, res) => {
    let { title, body,photo } = req.body;
    let post = await postdb.create({ title, body,photo } );
    res.send({ msg: "post created sucessfull", post });
  });
  

  module.exports = postRouter;
