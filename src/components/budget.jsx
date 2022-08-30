import { useState, useEffect, useContext } from "react"
import IncomeRow from "./incomeRow"
import ExpenseRow from "./expenseRow"


const Budget = (props) => {

    // make sure this matches the data structure for backend.. may be list instead of arrays
    const [incomeRows, setIncomeRows] = useState([])
    const [expenseRows, setExpenseRows] = useState([])
    const [incomeTotal, setIncomeTotal] = useState(0)

    let budget = useContext(DataContext).budget

    const loadBudget = async() => {
        budget.forEach(element => {
            if(element === "income"){
                element.forEach(row => {
                    let copy = [...incomeRows]
                    copy.push(row)
                    setIncomeRows(copy)
                })
            }
            if(element === "expenses"){
                element.forEach(row => {
                    let copy = [...expenseRows]
                    copy.push(row)
                    setExpenseRows(copy)
                })
            }
        });
    }

    useEffect(()=>{
        loadBudget()
    }, [])

    return(
        <div>
            <div className="income-table-container">
                <table className="income-table table">
                    <tbody>
                        {
                            rows.map(row => {
                                <IncomeRow></IncomeRow>
                            })
                        }
                    </tbody>
                </table>
                <table className="income-table total-table">
                    <tbody>
                        <tr className="income-row">
                            <td className="total-income">Total Income</td>
                        </tr>
                        <tr className="income-row left-t-header">
                            <td className="total-income-value">${incomeTotal}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="expense-table-container">
                <table className="expense-table table">
                    <tbody>
                        {
                            expenseRows.map((expenseRow) => (
                                <ExpenseRow key={expenseRow.index} data={expenseRow} delete={deleteExpenseRow} toggle={togglePopup}></ExpenseRow>
                            ))
                        }
                    </tbody>
                </table>
                <table className="expense-table total-table">
                    <tbody>
                        <tr className="expense-row left-t-header">
                            <td className="total-expense">Total Expenses</td>
                        </tr>
                        <tr className="expense-row left-t-header">
                            <td className="total-expense-value">${expenseTotal}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Budget