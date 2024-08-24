const express=require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
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
    const {amount,to}=req.body;
    //getting account of user
    const account=await Account.findOne({
        userId:req.userId
    });
   // checking if user has sufficient balance or not
    if(account.balance<amount){
        return res.status(400).json({
            message:"Insufficient Balance"
        })
    }

    //getting account of person whom to send

    const toAccount=await Account.findOne({
        userId:to
    });

    // if this account is not valid
    if(!toAccount){
        return res.status(400).json({
            message:"Invalid Account"
        })
    }

    //debit amount from user

    await account.updateOne({
        userId:req.userId
    },{
        $inc:{
            balance: -amount
        }
    })

    // credit amount to Friend

    await toAccount.updateOne({
        userId:to
    },{
        $inc:{
            balance: amount
        }
    })

    res.json({
        message:"Transfer Successful"
    })
})
module.exports=router;