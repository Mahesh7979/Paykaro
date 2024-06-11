const express = require("express");
const { signupTypes, signinTypes, updateTypes } = require("../types");
const router = express.Router();
const { user, acc, transactions } = require("../MongoDB/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authMiddleware = require("./middleware");
require("dotenv").config();

router.get('/',authMiddleware , async(req,res)=>{
  try{
    userId = req.userId;
    const euser = await user.findOne({
     _id : userId,
    });
    if(!euser){
      return res.send({
        msg:'user not found'
      })
    }

    else{
      const history = await transactions.find({
        userId:req.userId,
      })
      // const user = euser.toObject()
      // delete user.password
      const account =  await acc.findOne({
        userId 
      })
      // user.balance = account.balance
      // user.noOfTransactions = account.noOfTransactions
      res.send({
        accBalance: account.balance.toFixed(2),
        accNot : account.noOfTransactions,
        history
       })}

  }catch(error){
console.log(error)
  }
})

router.post("/signup", async (req, res) => {
  const register = req.body;
  const valid = signupTypes.safeParse(register);
  if (!valid.success) {
    return res.json({
      msg: "Invalid inputs",
    });
  }
  try {
    const exist = await user.findOne({
      username: register.username,
    });
    const mexist = await user.findOne({
      mobile : register.mobile,
    })
    if (exist) {
      return res.json({
        msg: "user already exists",
      });
    }
    if(mexist){
      return res.json({
        msg: "mobile already exists",
      });
    }
    const hpassword = await bcrypt.hash(register.password, 10);
    const newUser = await user.create({
      username: register.username,
      password: hpassword,
      firstname: register.firstname,
      mobile: register.mobile,
    });
    if (!newUser) {
      return res.json({
        msg: "sorry cannot create this user",
      });

    }
    const balance =  (1 + Math.random() * 10000).toFixed(2);
    const noOfTransactions = 0;
  const account=  await acc.create({
      userId: newUser._id,
      balance: balance,
      noOfTransactions : noOfTransactions,
      
    });
    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.JWT_SECRET
    );
    const userRes = newUser.toObject()
    delete userRes.password;
    res.json({
      msg: "user registered successfully",
      token: token,
      user : userRes,
      accBalance : account.balance.toFixed(2),
      accNot : account.noOfTransactions,
    });
  } catch (error) {
    console.log("Server error while registration , please try again", error);
  }
});

router.post("/signin", async (req, res) => {
  const login = req.body;
  const valid = signinTypes.safeParse(login);
  if (!valid) {
    return res.json({
      msg: "please enter valid email (or) password",
    });
  }
  try {
    const euser = await user.findOne({
      username: login.username,
    });
    if (!euser) {
      res.json({
        msg: "user does not exist",
      });
    }

    const match = await bcrypt.compare(login.password, euser.password);

    if (match) {
      const token = jwt.sign(
        {
          userId: euser._id,
        },
        process.env.JWT_SECRET
      );
      const account = await acc.findOne({
        userId :euser._id})
      const userRes = euser.toObject()
    delete userRes.password;
    
      return res.json({
        token: token,
        user : userRes, 
        accBalance : account.balance.toFixed(2),
        accNot : account.noOfTransactions,
        msg : "successfully logged in"
      });
    } else {
      return res.json({
        msg: "Incorrect password",
      });
    }
  } catch (error) {
    console.log("Error logging in", error);
  }
});

router.put("/update", authMiddleware, async (req, res) => {
  const update = req.body;
  const valid = updateTypes.safeParse(update);
  if (!valid) {
    return res.json({
      msg: "Invalid inputs",
    });
  }

  try {
    if (update.password && update.newPassword) {
      const userId = req.userId
      const euser = await user.findOne({
        _id : userId
      });
      const match = await bcrypt.compare(update.password, euser.password);
      if(!match){
        return res.json({
          msg : "Incorrect current password"
        })
      }
      const uhpassword = await bcrypt.hash(update.newPassword, 10);
      update.newPassword = uhpassword;
    }
    const s = await user.updateOne(
      {
        _id: req.userId,
      },
      {
        $set: {
          password : update.newPassword
        },
      }
    );
    if (!s) {
      return res.json({
        msg: "Error while updating , please try again",
      });
    }
    res.json({
      msg: "password updated successfully",
      alert : "Since you have changed your password , for security resons you have to login again"
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      msg: "Server error",
    });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const fil = await user.find({
      $and: [ // Use $and to combine conditions
        {
          $or: [
            {
              firstname: {
                $regex: filter,
                $options: "i" // Case-insensitive matching
              },
            },
            {
              mobile: {
                $regex: filter,
                $options: "i" // Case-insensitive matching
              }
            }
          ]
        },
        {
          _id: { $ne: req.userId } // Exclude the currently logged-in user
        }
      ]
    });

    res.json({
      fil: fil.map((f) => ({
        userId: f._id,
        username: f.username,
        firstname: f.firstname,
        mobile: f.mobile,
      })),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete",async (req,res)=>{
  const del = req.body;
  if(del.username){
   const check= await user.findOne({
      username : del.username
    })
    if(check){
    try{
  await user.deleteOne({
    username : del.username
  })
}
    
catch(error){
  return res.json({
    msg : "error"
  })
}
res.json({
  msg : "user deleted"
})
    }
    else{
      res.json({
        msg : "user not found"
      })
    }
  

  }}

)

module.exports = router;
