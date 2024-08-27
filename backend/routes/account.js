const express=require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const router=express.Router();

/*************************************Creating Endpoint For Getting Balance Of User *******************/
router.get("/balance",authMiddleware,async (req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    });
    res.json({
        balance:account.balance
    })
})

/************************************* Creating Endpoint To Transfer Money *******************/
router.post("/transfer",authMiddleware,async (req,res)=>{
    const session=await mongoose.startSession();
    session.startTransaction();

    const {amount,to}=req.body;
 //getting account of user
    const account=await Account.findOne({
        userId:req.userId
    }).session(session);
     // checking if user has sufficient balance or not
    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        })
    }
//getting account of person whom to send
    const toAccount=await Account.findOne({
        userId:to
    }).session(session);
 // if this account is not valid
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid Account"
        })
    }
 //debit amount from user
    await Account.updateOne({userId:req.userId},{
        $inc:{
            balance: -amount
        }
    }).session(session)
  // credit amount to Friend

    await Account.updateOne({userId:to},{
        $inc:{
            balance: amount
        }
    }).session(session)

    //commit transaction

    await session.commitTransaction();
    res.json({
        message:"Transfer Successful"
    })
})
module.exports=router;