const express = require('express');
const zod = require('zod');
const { User } = require("../db");
const { JWT_SECRET } = require('../config');
const jwt=require("jsonwebtoken");

const router = express.Router();
//sign up and signin routes
const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});
router.post("/signup", async (req, res) => {
    const body = req.body;
    //zod validation
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
        return res.json({
            message: "Email already exists/invalid inputs"
        })
    }
   //checking if user already exists in DB
    const user = User.findOne({
        username: body.username
    })
    if (user._id) {
        return res.json({
            message: "Email already exists/invalid inputs"
        })
    }
 // if user does not already exist, put it in db
    const dbUser=await User.create(body);
// creating token for the user
    const token=jwt.sign({
        userId:user._id
    },JWT_SECRET);

    res.json({
        message:"User Created Successfully",
        token:token
    })

})


module.export = router;
