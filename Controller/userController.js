import asynchandler from "../middleware/asynchandler.js";
import User from "../Models/userModels.js";
import bcrypt from 'bcryptjs';

const createUser = asynchandler(async(req, res) => {
    try{
        const {email, password} = req.body;
        if(!email|| !password) {
            res.status(400).json({
                message:'Please fill the fields'
            
            });
        };

//check if user exists in the in-memory users array
const oldUser = await User.findOne({email})
if (oldUser) {
    res.status(400).json({
        message:"user already exists,please sign in"
    });
};

// hash password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)

//registering new user
const newUser = User({email, password:hashedPassword});
try{
    await newUser.save();
    res.status(201).json({
        message:'user successfully created',
        data:newUser,
    });
}catch (error){
    throw new error('error.message')
}

    }catch (error){
        console.log(error)
        res.status(500).json ({
            message:'internal server error'
        });
    };

});






export {
    createUser
};