const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 36,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 36,
  },
  mobile: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v.toString()); // Validates if the mobile number is exactly 9 digits
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
  },
});

const user = mongoose.model("user", UserSchema);

const accSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  noOfTransactions: {
    type: Number,
    required:true,
  },
 

  
});
const acc = mongoose.model("acc", accSchema);

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "user",
    required: true,
  },
  toOrFromId: {
    type : String,
    required : true,
  },
  toOrFrom: {
    type: String,
    required: true
  },
  amount:{
    type: Number,
    required : true,
  },
  transactionType: {
    type: String,
    enum: ['debit', 'credit'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

const transactions = mongoose.model("transactions" , transactionSchema);

module.exports = {
  user,
  acc,
  transactions,
};
