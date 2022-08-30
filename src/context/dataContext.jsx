import { createContext } from "react";


let DataContext = createContext({

    budgets: [],
    budget: {},
    user: {},

    addBudget: () => {},
    removeBudget: () => {},
    updateBudget: () => {},
    setNewBudget: () => {},
    clearBudget: () => {},
    addUser: () => {},
    removeUser: () => {},
    updateUser: () => {}

})

export default DataContext