const express = require('express');
const zod = require('zod');
const { User,Account } = require("../db");
const { JWT_SECRET } = require('../config');
const jwt = require("jsonwebtoken");
const {authMiddleware}=require('../middleware')

const router = express.Router();
/* ............................SignUp.................................................*/

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
        return res.status(411).json({
            message: "invalid inputs"
        })
    }
    //checking if user already exists in DB
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if (existingUser) {
      return res.status(411).json({
          message: "Email already taken/Incorrect inputs"
      })
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
})
    /*****************************Creating A New Account***************************/
    const userId=user._id;
    await Account.create({
      userId,
      balance:1+Math.random()*10000
    })
    /******************************************************************************************************/
    
    // creating token for the user
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User Created Successfully",
        token: token
    })

})

/* ............................SignIn routes.................................................*/

const signinBody=zod.object({
    username:zod.string().email(),
    password:zod.string()
});

router.post("/signin",async (req,res)=>{
  const {success}=signinBody.safeParse(req.body);
  if(!success){
    return res.status(411).json({
        message:"Invalid inputs"
    })
  }
//checking if user is present in db or not
  const user=await User.findOne({
    username:req.body.username,
    password:req.body.password
  })

// if user is there in db
  if(user){
    //creating token for user
    const token=jwt.sign({
        userId:user._id,
    },JWT_SECRET);

    res.json({
        token:token
    })
    return;
  }

  res.status(411).json({
    message:"Error while logging in"
  })
})

/* ............................updation routes.................................................*/

// schema for input validation
const updateBody=zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastname: zod.string().optional()
});

router.put("/",authMiddleware,async (req,res)=>{
  const {success}=updateBody.safeParse(req.body);
  if(!success){
    res.status(411).json({
      message:"Error while updating information"
    })
  }
//updating the db
  await User.updateOne({_id:req.userId},req.body)
  res.json({
    message:"Updated Successfully"
  })
})

/* ..............Route to get users from the backend, filterable via firstName/lastName............*/

router.get("/bulk",async (req,res)=>{
  const filter = req.query.filter || "";
  const users=await User.find({
    $or:[{
      firstName:{
        "$regex":filter
      }
    },{
      lastName:{
        "$regex":filter
      }
    }]
  })
  res.json({
    user:users.map(user=>({
      username:user.username,
      firstName:user.firstName,
      lastName:user.lastName,
      _id:user._id
    }))
  })
})


module.exports = router;
