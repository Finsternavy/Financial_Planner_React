import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Tile from "../components/tile"
import "../components/budgetHome.css"
import DataContext from "../context/dataContext"
import DataService from "../services/dataService"

function BudgetHome() {
    let [userBudgets, setUserBudgets] = useState([])
    let [budgetSelection, setBudgetSelection] = useState(0)
    let budget = useContext(DataContext).setBudget

    const loadBudgets = async() => {
        let service = new DataService()
        let data = await service.getBudgets()
        setUserBudgets(data)
        console.log(data)
    }

    useEffect(()=>{
        loadBudgets()
    }, [])

    let navigate = useNavigate()

    const newBudget = () => {
        budget({
            "title": "",
            "income": [],
            "expenses": []
        })
        let path = '/new-budget'
        navigate(path)
    }

    const viewBudget = () => {
        console.log(budgetSelection)
        budget(userBudgets[budgetSelection])
        let path = "/new-budget"
        navigate(path)
    }

    const updateIndex = () => {
        
        let option = document.querySelector('.saved-budget-dropdown').value
        console.log(option)
        let index = 0
        userBudgets.forEach(budget =>{
            if (option == budget._id){
                console.log(option + "  " + budget._id)
                setBudgetSelection(index)
            }
            index += 1
            console.log("Index increased")
        })

    }

    return (
        <div className="budget-home">
            <h1 className="header">My Budgets</h1>
            <div className="tile-container budget-tile-container">
                <div className="budget-home-container budget-select">
                     <div className="tile-btn-container">
                        <button className="tile-btn" onClick={viewBudget}>View Budget</button>
                    </div>
                    <select className="saved-budget-dropdown" onChange={updateIndex} name="budget" id="budget">
                        <option value=""></option>
                        {
                            userBudgets.map((budget) => (
                                <option key={budget._id} value={budget._id}>{budget.title}</option>))
                        }
                    </select>
                </div>
                <div className="budget-home-container">
                    <div className="tile-btn-container">
                        <button className="tile-btn" onClick={newBudget}>New Budget</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BudgetHome