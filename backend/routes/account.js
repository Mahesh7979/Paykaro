const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {user, acc, transactions } = require("../MongoDB/db");
const authMiddleware = require("./middleware");

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  const { amount, to } = req.body;

  try {
    const fromAccount = await acc.findOne({ userId: req.userId }).session(session);
    const toAccount = await acc.findOne({ userId: to }).session(session);
    const fromUser = await user.findOne({ _id: req.userId }).session(session);
    const toUser = await user.findOne({ _id: to }).session(session);
    if (!fromAccount || !toAccount) {
      await session.abortTransaction();
      return res.json({ msg: "Transfer failed" });
    }
    if( fromAccount.balance < amount ){
      await session.abortTransaction();
      return res.json({ msg: "insufficient funds" });
    }

    // Update sender's account
    await acc.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount, noOfTransactions: 1 } }
    ).session(session);

    // Update receiver's account
    await acc.updateOne(
      { userId: to },
      { $inc: { balance: amount, noOfTransactions: 1 } }
    ).session(session);
    // Create transaction document for sender
    await transactions.create({
      userId: req.userId,
      toOrFromId : to,
      toOrFrom: toUser.firstname,
      amount,
      transactionType: "debit",
      status : "completed"
    });

    // Create transaction document for receiver
    await transactions.create({
      userId: to,
      toOrFromId : req.userId,
      toOrFrom: fromUser.firstname,
      amount,
      transactionType: "credit",
      status : "completed",
    });
    await session.commitTransaction(); // Commit transaction outside try block

    res.json({
       msg: "Transfer successful" ,
    });
  } catch (error) {
    console.log(error);
    await transactions.create({
      userId: req.userId,
      toOrFromId : to,
      toOrFrom: toUser.firstname,
      amount,
      transactionType: "debit",
      status : "failed"
    });

    // Create transaction document for receiver
    await transactions.create({
      userId: to,
      toOrFromId : req.userId,
      toOrFrom: fromUser.firstname,
      amount,
      transactionType: "credit",
      status : "failed",
    });
    await session.abortTransaction();
    res.json({ msg: "An error occurred. Please try again later." });
  } finally {
    session.endSession();
  }
});



module.exports = router;
