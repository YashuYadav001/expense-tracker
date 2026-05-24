const express=require("express")
const cors=require("cors")

const app=express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
 res.send("Expense Tracker API")
})

app.listen(5000,()=>{
 console.log("Server running")
})

const connectDB=require("./config/db")

connectDB()


const expenseRoutes=
require("./routes/expenseRoutes")

app.use(
"/expenses",
expenseRoutes
)