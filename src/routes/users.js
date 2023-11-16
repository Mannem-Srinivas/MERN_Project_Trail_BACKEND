import express, { response } from "express";
import { UserModel } from "../models/Users.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router()

router.post("/register",async (req,res)=>{
    const {username,password} = req.body;
    if(username.trim()==="" && password.trim()===""){
        return res.status(422).json({message:"Username and password should not be empty"})
    }
    const user = await UserModel.findOne({username});

    if(user){
        console.log("user name taken");
        return res.json({message:"username taken already,try another username!"});
    }

    const hashedPassword  = await bcrypt.hash(password,10);

    const newUser =new UserModel({username,password:hashedPassword});  //adding data to databse(mongoDB) using mongoose
    await newUser.save();

    res.json({message:"User registered succesfully 😎!"});
});




router.post("/login",async (req,res)=>{
    const {username,password} = req.body;
    if(username.trim()==="" && password.trim()===""){
        return res.status(422).json({message:"Username and password should not be empty"})
    }
    const user = await UserModel.findOne({username});

    if(!user){
        return res.json({message:"username doesn't exist!"});
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    
    if (!isPasswordCorrect) {
        console.log("wrong password");
        return res.status(401).json({ message: "username or password is wrong!" });
    }    

    const token = jwt.sign({id : user._id},"secret");     //for verifying that the user logged in is not a unauthorized person
    res.json({message:"Logged ine🟩",token,userID:user._id});


});



export {router as userRouter};