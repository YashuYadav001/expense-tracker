import React, {
  useEffect,
  useState
} from "react"

import API from "./services/api"

const App = () => {

  const [expenses, setExpenses] =
    useState([])

  const [formData, setFormData] =
    useState({
      title: "",
      amount: "",
      category: ""
    })


  // Handle input
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    })

  }


  // Fetch expenses
  const fetchExpenses =
    async () => {

      try {

        const res =
          await API.get(
            "/expenses"
          )

        setExpenses(
          res.data
        )

      }

      catch (error) {

        console.log(error)

      }

    }


  useEffect(() => {

    fetchExpenses()

  }, [])



  // Submit form
  const handleSubmit =
    async (e) => {

      e.preventDefault()

      try {

        if(editId){

await API.put(

`/expenses/${editId}`,

formData

)

setEditId(null)

}

else{

await API.post(

"/expenses",

formData

)

}
        fetchExpenses()

        setFormData({

          title: "",
          amount: "",
          category: ""

        })

      }

      catch (error) {

        console.log(error)

      }

    }

     const deleteExpense=
async(id)=>{

try{

await API.delete(
`/expenses/${id}`
)

fetchExpenses()

}

catch(error){

console.log(error)

}

}

const [editId,
setEditId]
=
useState(null)


  return (

    <div>

      <h1>
        Expense Tracker
      </h1>


      <form
        onSubmit={handleSubmit}
      >

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <button>
          Add Expense
        </button>

      </form>


      {
        expenses.map(
          (expense) => (

            <div
              key={expense._id}
            >

              <h3>
                {expense.title}
              </h3>

              <p>
                ₹{expense.amount}
              </p>

              <p>
                {expense.category}
              </p>

              
              <button
onClick={()=>
deleteExpense(
expense._id
)}
>

Delete

</button>

<button

onClick={()=>{

setFormData({

title:
expense.title,

amount:
expense.amount,

category:
expense.category

})

setEditId(
expense._id
)

}}

>

Edit

</button>

            </div>

          ))
      }

    </div>

  )

}

export default App