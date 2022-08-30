import { useState } from "react";
import DataContext from "./dataContext";

const GlobalDataProvider = (props) => {

    const [budgets, setBudgets] = useState([])
    const [user, setUser] = useState({})
    const [budget, setBudget] = useState({})

    const addBudget = (newBudget) => {
        console.log("Global addBudget")

        let copy = [...budgets]
        let found = false
        for (let i = 0; i < copy.length; i++){
            let budget = copy[i]
            if (budget._id === newBudget._id){
                found = true
                // add logic to update existing budget values
                // updateBudget(newBudget._id)
            }
        }

        if (!found){
            copy.push(newBudget)
        }

        setBudgets(copy)

    }

    const removeBudget = (id) => {
        console.log("Global remove budget")

        let copy = [...budgets]
        let found = false

        for (let i = 0; i < copy.length; i++){
            let budget = copy[i]
            if (budget._id === id){
                found = true
                copy.splice(i, 1)
            }
        }

        if (found){
            console.log("Found it!")
            setBudgets(copy)
        }else{
            console.log("Couldn't find the budget")
        }


    }

    const updateBudget = (prod) => {
        
    }

    const setNewBudget = (budget) => {
        console.log("Global setBudget")
        let copy = {...budget}
        copy = budget
        setBudget(copy)

    }
    
    const clearBudget = () => {

    }

    const addUser = (prod) => {

    }

    const removeUser = (prod) => {

    }

    const updateUser = (prod) => {

    }

    return (
        <DataContext.Provider value={{

            budgets: budgets,
            budget: budget,
            user: user,

            addBudget: addBudget,
            removeBudget: removeBudget,
            updateBudget: updateBudget,
            setBudget: setNewBudget,
            addUser: addUser,
            removeUser: removeUser,
            updateUser: updateUser

        }}>
            {props.children}
            </DataContext.Provider>
    )

}

export default GlobalDataProvider