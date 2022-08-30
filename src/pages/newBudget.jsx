import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../components/newBudget.css"
import IncomeRow from "../components/incomeRow"
import ExpenseRow from "../components/expenseRow"
import AddIncomeLineTool from "../components/addIncomeLineTool"
import AddExpenseLineTool from "../components/addExpenseLineTool"
import Popup from "../components/popup"
import DataContext from "../context/dataContext"
import DataService from "../services/dataService"

// Add a way to title the new budget

const NewBudget = () => {
    let budget = useContext(DataContext).budget
    let setBudget = useContext(DataContext).setBudget

    const [index, setIndex] = useState(0)
    const [incomeRows, setIncomeRows] = useState([])
    const [incomeTotal, setIncomeTotal] = useState(0)
    const [expenseRows, setExpenseRows] = useState([])
    const [expenseTotal, setExpenseTotal] = useState(0)
    
    const [surplus, setSurplus] = useState(0)
    const [popup, setPopup] = useState(false)

    const [editIndex, setEditIndex] = useState(0)
    const [editName, setEditName] = useState('')
    const [editValue, setEditValue] = useState(0)


    const loadBudget = () => {
        console.log(budget)
        let incomeCopy = [...incomeRows]
        let expenseCopy = [...expenseRows]
        budget['income'].forEach(row => {
            incomeCopy.push(row)
        })
        budget['expenses'].forEach(row => {
            expenseCopy.push(row)
        })

        setIncomeRows(incomeCopy)
        setExpenseRows(expenseCopy)
        setIncomeTotal(budget['income_total'])
        setExpenseTotal(budget['expense_total'])
        setSurplus(budget['surplus'])
        updateSurplusElement(budget['surplus'])
        setIndex(budget['next_index'])
    }

    useEffect(()=>{
        if (budget['title']){
            loadBudget()
            console.log("I ran")
        }
    }, [])

    // these values are used to reset input fields after submitting the changes to the lists (income / expenses)
    

    let navigate = useNavigate()

    const saveBudget = async() => {
        budget['title'] = "Chris's Budget"
        budget['income_total'] = incomeTotal
        budget['expense_total'] = expenseTotal
        budget['surplus'] = surplus
        countBudgetIndex()
        let service = new DataService()
        let data = await service.postBudget(budget)
        console.log(data)
    }

    const countBudgetIndex = () => {
        let count = 0
        budget['income'].forEach(element => {
            count += 1
        })
        budget['expenses'].forEach(element => {
            count += 1
        })
        budget['next_index'] = count
    }

    const budgetHome = () => {
        let path = '/home'
        navigate(path)
    }

    const updateIncomeList = (newRow) => {
        setIncomeRows(prev=>([...prev, newRow]))
        // calculateSurplus(newRow.value, 0)
        calculateTotalIncome(newRow.value)
    }
    
    const addIncomeRow = (newRow) => {
        // if (!newRow.source || !newRow.value || !newRow.frequency ){
        //     alert('Please complete all income fields')
        //     return
        // }
        // if (parseFloat(newRow.value) < 0.01){
        //     alert('Income value must at least 1 penny.')
        //     return
        // }
        // if (newRow.frequency === '/hourly' && newRow.hours === 0){
        //     alert('Hours worked must be greater than zero.')
        //     return
        // }
        // newRow['index'] = index
        console.log(newRow)
        setIndex(index + 1)
        updateIncomeList(newRow)
        let newSurplus = surplus + parseFloat(newRow.value)
        setSurplus(newSurplus)
        updateSurplusElement(newSurplus)
    }

    // const expenseRowChange = (e) => {
    //     setExpenseRow(prev => ({...prev, ['index']:index}))
    //     setExpenseRow(prev => ({...prev, [e.target.name]:e.target.value}))
    // }

    const updateExpenseList = (newRow) => {
        setExpenseRows(prev => [...prev, newRow])
        calculateTotalExpenses(newRow.expenseValue)
    }
    
    // const updateExpenseValue = (newRow) => {
    //     let convertedExpense = parseFloat(newRow.expenseValue).toFixed(2)
    //     let copy = newRow
    //     copy['expenseValue'] = parseFloat(convertedExpense).toFixed(2)
    //     newRow(prev=> prev = copy)
    //     calculateTotalExpenses(convertedExpense)
    // }

    const addExpenseRow = (newRow) => {
       
        setIndex(index + 1)
        updateExpenseList(newRow)
        let newSurplus = surplus - parseFloat(newRow.expenseValue)
        setSurplus(newSurplus)
        // setExpenseRow({})
        updateSurplusElement(newSurplus)
    }

    const updateSurplusElement = (newSurplus) => {
    
        let surplusElement = document.querySelector('.surplus-table')

        if (newSurplus > 0){
            surplusElement.classList.remove('deficit')
            surplusElement.classList.add('surplus')
        }else if (newSurplus < 0){
            surplusElement.classList.remove('surplus')
            surplusElement.classList.add('deficit')
        }else{
            surplusElement.classList.remove('surplus')
            surplusElement.classList.remove('deficit')
        }
    }

    const editIncomeRow = (changes) => {

        let nameChange = changes.source
        let valueChange = changes.value
        if (!nameChange){
            nameChange = editName
        }
        if(!valueChange){
            valueChange = editValue
        }
        if (changes.source !== ""){
            let count = 0
            incomeRows.forEach(element => {
                if (element._id === editIndex){
                    let copy = [...incomeRows]
                    copy[count].source = nameChange
                    copy[count].value = parseFloat(valueChange).toFixed(2)
                    setIncomeRows(copy)
                    calculateSurplus(0, 0)
                    togglePopup()
                    return
                }
                count += 1
            });
            count = 0
            expenseRows.forEach(element => {
                if (element.index === editIndex){
                    let copy = [...expenseRows]
                    copy[count].expenseName = nameChange
                    copy[count].expenseValue = parseFloat(valueChange).toFixed(2)
                    setExpenseRows(copy)
                    calculateSurplus(0, 0)
                    togglePopup()
                    return
                }
                count += 1
            })
        }
        togglePopup()
    }
    const calculateSurplus = (incomeOffset, expenseOffset) => {
        let totalIncome = 0.00
        let totalExpenses = 0.00
        totalIncome = calculateTotalIncome(parseFloat(incomeOffset))
        totalExpenses = calculateTotalExpenses(parseFloat(expenseOffset))

        let newSurplus = 0.00
        newSurplus = totalIncome - totalExpenses
        setSurplus(newSurplus)
        updateSurplusElement(newSurplus)
    }

    const calculateTotalIncome = (currentValue) => {
        let total = parseFloat(currentValue)
        incomeRows.forEach(element => {
            total += parseFloat(element.value)
        });
        total = total.toFixed(2)
        setIncomeTotal(total)
        return parseFloat(total)
    }

    const calculateTotalExpenses = (currentValue) => {
        let total = parseFloat(currentValue)
        expenseRows.forEach(element => {
            total += parseFloat(element.expenseValue)
        });
        total = total.toFixed(2)
        setExpenseTotal(total)
        return parseFloat(total)
    }

    const togglePopup = (data) => {
        if (popup){
            setPopup(false)
            return
        }
        let newIndex = parseFloat(data.index)
        setEditIndex(newIndex)
        if(data.source){
            setEditName(data.source)
            setEditValue(data.value)
        }else{
            setEditName(data.expenseName)
            setEditValue(data.expenseValue)
        }

        setPopup(true)
    }

    const deleteIncomeRow = (rowIndex) => {
        let count = 0
        let incomeOffset = 0
        console.log(rowIndex)
        incomeRows.forEach(element => {
            console.log(element.index + " : " + rowIndex)
            if (element.index === rowIndex){
                incomeOffset = element.value * -1
                calculateSurplus(incomeOffset, 0)
                let copy = [...incomeRows]
                copy.splice(count, 1)
                setIncomeRows(copy)
                let rowCount = 0
                budget['income'].forEach(row => {
                    if (row.index === rowIndex){
                        budget['income'].splice(rowCount, 1)
                        console.log(budget)
                        return
                    }else{
                        rowCount += 1
                    }
                })
                return
            }
            count += 1
        });
    }

    const deleteExpenseRow = (rowIndex) => {
        let count = 0
        let expenseOffset = 0
        expenseRows.forEach(element => {
            if (element.index === rowIndex){
                expenseOffset = element.expenseValue * -1
                calculateSurplus(0, expenseOffset)
                let copy = [...expenseRows]
                copy.splice(count, 1)
                setExpenseRows(copy)
            }
            count += 1
        });
    }

    const toggleIncomeTool = () => {
        let element = document.querySelector('.add-income-line-tool')
        element.classList.toggle("open")
        toggleIncomeText()
    }

    const toggleIncomeText = () => {
        let toggleButton = document.querySelector('.open-income-btn')
        toggleButton.classList.toggle("open")

        if (toggleButton.classList.contains('open')){
            toggleButton.textContent = 'Close Insert Tool'
        }else{
            toggleButton.textContent = 'Open Insert Tool'
        }
    }

    const toggleExpenseTool = () => {
        let element = document.querySelector('.add-expense-line-tool')
        element.classList.toggle("open")
        toggleExpenseText()
    }

    const toggleExpenseText = () => {
        let toggleButton = document.querySelector('.open-expense-btn')
        toggleButton.classList.toggle("open")

        if (toggleButton.classList.contains('open')){
            toggleButton.textContent = 'CLOSE INSERT TOOL'
        }else{
            toggleButton.textContent = 'OPEN INSERT TOOL'
        }
    }


    return (
        <div className="new-budget">
            <h1 className="header">New Budget</h1>
            <div className="open-btn-container">
                <button className="open-btn open-income-btn" onClick={toggleIncomeTool}>Open Insert Tool</button>
            </div>
            <AddIncomeLineTool index={index} update={addIncomeRow}></AddIncomeLineTool>
            {
                popup &&
                <Popup edit={editIncomeRow} toggle={togglePopup} editName={editName} editValue={editValue}></Popup>
            }
            <div className="table-headers">
                <div className="left-header">
                    <p className="header-text">Income Source</p>
                </div>
                <div className="right-header">
                    <p className="header-text">Income Value (Per Month)</p>
                </div>
            </div>
            <div className="income-tables-container">
                <table className="income-table table">
                    <tbody>
                        {
                            incomeRows.map((incomeRow) => (
                                <IncomeRow key={incomeRow._id} data={incomeRow} delete={deleteIncomeRow} toggle={togglePopup}></IncomeRow>
                            ))
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

            <hr />

            <div className="open-btn-container">
                <button className=" open-btn open-expense-btn" onClick={toggleExpenseTool}>Open Insert Tool</button>
            </div>

            <AddExpenseLineTool index={index} update={addExpenseRow}></AddExpenseLineTool>
            
            <div className="table-headers">
                <div className="left-header">
                    <p>Expense Name : Priority</p>
                </div>
                <div className="right-header">
                    <p>Expense Value (Per Month)</p>
                </div>
            </div>
            <table className="expense-table table">
                <tbody>
                    {
                        expenseRows.map((expenseRow) => (
                            <ExpenseRow key={expenseRow._id} data={expenseRow} delete={deleteExpenseRow} toggle={togglePopup}></ExpenseRow>
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

            <hr />

            <table className="surplus-table total-table">
                <tbody>
                    <tr className="surplus-row row">
                        <td className="surplus-total-title">Surplus / Deficit</td>
                    </tr>
                    {surplus < 0 && 
                        <tr className="surplus-row row">
                            <td className="surplus-data">${surplus.toFixed(2) * -1}</td>
                        </tr>
                    }
                    {surplus >= 0 &&
                        <tr className="surplus-row row">
                            <td className="surplus-data">${surplus.toFixed(2)}</td>
                        </tr>
                    }
                </tbody>
            </table>

            <div className="btn-container">
                <button className="btn" onClick={saveBudget}>Save Budget</button>
                <button className="btn" onClick={budgetHome}>Budget Home</button>
            </div>
        </div>
    )
}

export default NewBudget