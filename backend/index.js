const express = require("express");
const app = express();
const cors = require("cors");
const rootRouter = require("../backend/routes/index");
require("dotenv").config();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);
app.get('/',(req,res)=>{
  res.json({
    msg : "hi"
   })
})
app.listen(PORT, () => {
  console.log("server running on " + PORT);
});
