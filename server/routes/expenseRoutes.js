const express=require("express")

const router=
express.Router()

const Expense=
require("../models/expenses")


// POST route
router.post("/",async(req,res)=>{

try{

const expense=
await Expense.create(
req.body
)

res.status(201)
.json(expense)

}

catch(error){

res.status(500)
.json({
message:error.message
})

}

})


// GET route
router.get("/",async(req,res)=>{

try{

const expenses=
await Expense.find()

res.status(200)
.json(expenses)

}

catch(error){

res.status(500)
.json({
message:error.message
})

}

})

router.put("/:id",async(req,res)=>{

try{

const expense=
await Expense.findByIdAndUpdate(

req.params.id,

req.body,

{new:true}

)

res.status(200)
.json(expense)

}

catch(error){

res.status(500)
.json({
message:error.message
})

}

})

router.delete("/:id",async(req,res)=>{

try{

const expense=
await Expense.findByIdAndDelete(
req.params.id
)

res.status(200)
.json({
message:"Expense deleted",
expense
})

}

catch(error){

res.status(500)
.json({
message:error.message
})

}

})

module.exports=router