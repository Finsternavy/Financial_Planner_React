import { useNavigate } from "react-router-dom"
import Tile from "../components/tile"
import "../components/budgetHome.css"

function BudgetHome() {

    let navigate = useNavigate()

    const newBudget = () => {
        let path = '/new-budget'
        navigate(path)
    }

    return (
        <div className="budget-home">
            <h1 className="header">My Budgets</h1>
            <div className="tile-container budget-tile-container">
                <div className="budget-home-container budget-select">
                    <Tile title="View Budget" path="/view-budget" />
                    <select className="saved-budget-dropdown" name="budget" id="budget">
                        <option value=""></option>
                        <option value="saved-budget">Saved Budget</option>
                        <option value="saved-budget">some Budget</option>
                        <option value="saved-budget">Other Budget</option>
                    </select>
                </div>
                <div className="budget-home-container">
                    <Tile title="Create New Budget" path="/new-budget" onclick={newBudget}/>
                </div>
            </div>
        </div>
    )
}

export default BudgetHome