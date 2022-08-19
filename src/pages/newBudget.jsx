import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../components/newBudget.css"
import IncomeRow from "../components/incomeRow"
import ExpenseRow from "../components/expenseRow"
import Popup from "../components/popup"


const NewBudget = () => {
    const [index, setIndex] = useState(0)
    const [incomeRow, setIncomeRow] = useState({
        source: "",
        value: 0,
        frequency: '/monthly',
        hours: 0,
        index: 0,
    })
    const [incomeRows, setIncomeRows] = useState([])
    const [incomeTotal, setIncomeTotal] = useState(0)
    const [expenseRow, setExpenseRow] = useState({
        expenseName: "",
        expenseValue: 0,
        expensePriority: 1,
        index: 0,
    })
    const [expenseRows, setExpenseRows] = useState([])
    const [expenseTotal, setExpenseTotal] = useState(0)
    
    const [surplus, setSurplus] = useState(0)
    const [popup, setPopup] = useState(false)
    const [editIndex, setEditIndex] = useState(0)

    // these values are used to reset input fields after submitting the changes to the lists (income / expenses)
    const incomeSourceField = useRef(null)
    const incomeValueField = useRef(null)
    const incomeFrequencyField = useRef(null)
    const expenseNameField = useRef(null)
    const expenseValueField = useRef(null)
    const expensePriorityField = useRef(null)
    const hoursField = useRef(null)
    

    let navigate = useNavigate()

    const saveBudget = () => {
        alert("Budget saved successfully!")
    }

    const budgetHome = () => {
        let path = '/home'
        navigate(path)
    }

    const incomeRowChange = (e) => {
        setIncomeRow(prev=>({...prev, ['index']:index}))
        setIncomeRow(prev=>({...prev, [e.target.name]:e.target.value}))
    }

    const updateIncomeList = () => {
        convertIncomeFrequency()
        setIncomeRows(prev=>([...prev, incomeRow]))
    }

    const convertIncomeFrequency = () => {

        let convertedIncome = 0.00

        if (incomeRow.frequency === '/hourly'){
            convertedIncome = incomeRow.value * (incomeRow.hours * (52 / 12))
        }else if (incomeRow.frequency === '/weekly'){
            convertedIncome = incomeRow.value * (52 / 12)
        }else if (incomeRow.frequency === '/bi-weekly'){
            convertedIncome = incomeRow.value * ((52 / 12) / 2)
        }else if (incomeRow.frequency === '/1st/15th'){
            convertedIncome = incomeRow.value * 2
        }else if (incomeRow.frequency === '/annualy'){
            convertedIncome = incomeRow.value / 12
        }else{
            convertedIncome = parseFloat(incomeRow.value)
        }
        convertedIncome = convertedIncome.toFixed(2)
        let copy = incomeRow
        copy['value'] = parseFloat(convertedIncome).toFixed(2)
        calculateTotalIncome(parseFloat(convertedIncome).toFixed(2))
        setIncomeRow(prev => prev = copy) 
    }
    
    const addIncomeRow = () => {
        if (!incomeRow['source'] || !incomeRow['value'] || !incomeRow['frequency'] ){
            alert('Please complete all income fields')
            return
        }
        if (parseFloat(incomeRow.value) < 0.01){
            alert('Income value must at least 1 penny.')
            return
        }
        if (incomeRow.frequency === '/hourly' && incomeRow.hours === 0){
            alert('Hours worked must be greater than zero.')
            return
        }
        setIndex(index + 1)
        setIncomeRow(prev=>(prev.hours = 0))
        updateIncomeList()
        let newSurplus = surplus + parseFloat(incomeRow.value)
        setSurplus(newSurplus)
        setIncomeRow({})
        clearInputFields()
        updateSurplusElement(newSurplus)
    }

    const expenseRowChange = (e) => {
        setExpenseRow(prev => ({...prev, ['index']:index}))
        setExpenseRow(prev => ({...prev, [e.target.name]:e.target.value}))
    }

    const updateExpenseList = () => {
        updateExpenseValue()
        setExpenseRows(prev => [...prev, expenseRow])
    }
    
    const updateExpenseValue = () => {
        let convertedExpense = parseFloat(expenseRow.expenseValue).toFixed(2)
        let copy = expenseRow
        copy['expenseValue'] = parseFloat(convertedExpense).toFixed(2)
        setExpenseRow(copy)
        calculateTotalExpenses(convertedExpense)
    }

    const addExpenseRow = () => {
        if (!expenseRow['expenseName'] || !expenseRow['expenseValue'] || !expenseRow['expensePriority']){
            alert('Please complete all expense fields')
            return
        }
        setIndex(index + 1)
        updateExpenseList()
        let newSurplus = surplus - parseFloat(expenseRow.expenseValue)
        setSurplus(newSurplus)
        setExpenseRow({})
        clearInputFields()
        updateSurplusElement(newSurplus)
    }

    const clearInputFields = () => {
        incomeSourceField.current.value = ''
        incomeValueField.current.value = ''
        incomeFrequencyField.current.value = ''
        expenseNameField.current.value = ''
        expenseValueField.current.value = ''
        expensePriorityField.current.value = ''
        setIncomeRow(prev => ({...prev, ['hours']:0}))

        incomeSourceField.current.placeholder ='Source of Income Title'
        incomeValueField.current.placeholder ='$0.00'
        expenseNameField.current.placeholder = 'Expense Name'
        expenseValueField.current.placeholder = '$0.00'
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
        if (changes.source !== ""){
            let count = 0
            incomeRows.forEach(element => {
                if (element.index === editIndex){
                    let copy = [...incomeRows]
                    // set these equal to something in some way. Need some method of user providing data
                    copy[count].source = changes.source
                    copy[count].value = parseFloat(changes.value).toFixed(2)
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
                    copy[count].expenseName = changes.source
                    copy[count].expenseValue = parseFloat(changes.value).toFixed(2)
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

    const togglePopup = (rowIndex) => {
        if (popup){
            setPopup(false)
            return
        }
        let newindex = parseFloat(rowIndex)
        setEditIndex(newindex)
        setPopup(true)
    }

    const deleteIncomeRow = (rowIndex) => {
        let count = 0
        let incomeOffset = 0
        incomeRows.forEach(element => {
            if (element.index === rowIndex){
                incomeOffset = element.value * -1
                calculateSurplus(incomeOffset, 0)
                let copy = [...incomeRows]
                copy.splice(count, 1)
                setIncomeRows(copy)
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

    return (
        <div className="new-budget">
            <h1 className="header">New Budget</h1>
            <div className="add-line-tool income-tool">
                <div className="add-btn-container">
                    <button className="add-btn" onClick={addIncomeRow}>+</button>
                </div>
                <input ref={incomeSourceField} name='source' onChange={incomeRowChange} type="text" placeholder="Source of Income Title"/>
                <input ref={incomeValueField} name='value' onChange={incomeRowChange} type="number" step={"0.01"} placeholder="$0.00"/>
                <select ref={incomeFrequencyField} name='frequency' id="frequency" onChange={incomeRowChange} className="frequency-dropdown dropdown">
                    <option value="">Frequency</option>
                    <option value="/hourly">Hourly</option>
                    <option value="/weekly">Weekly</option>
                    <option value="/bi-weekly">Bi-weekly</option>
                    <option value="/monthly">Monthly</option>
                    <option value="/1st/15th">1st and 15th</option>
                    <option value="/annualy">Annualy</option>
                </select>
                {
                    incomeRow.frequency === '/hourly' && <input ref={hoursField} name='hours' onChange={incomeRowChange} type="number" step={"0"} placeholder="Hours a week"/>
                }
            </div>
            {
                popup &&
                <Popup edit={editIncomeRow} toggle={togglePopup}></Popup>
            }
            <table className="income-table table">
                <tbody>
                    <tr>
                        <th className="edit-t-header">

                        </th>
                        <th className="table-header left-t-header">
                            Income Source
                        </th>
                        <th className="table-header right-t-header">
                            Income Value (Per Month)
                        </th>
                        <th className="delete-t-header">

                        </th>
                    </tr>
                    {
                        incomeRows.map((incomeRow) => (
                            <IncomeRow key={incomeRow.index} data={incomeRow} delete={deleteIncomeRow} toggle={togglePopup}></IncomeRow>
                        ))
                    }
                </tbody>
            </table>
            <table className="income-table table total-table">
                <tbody>
                    <tr className="income-row left-t-header">
                        <td className="total-income">Total Income</td><td className="total-income-value">${incomeTotal}</td>
                    </tr>
                </tbody>
            </table>

            <hr />

            <div className="add-line-tool expense-tool">
                <div className="add-btn-container add-expense-container">
                    <button className="add-btn add-expense" onClick={addExpenseRow}>+</button>
                </div>
                <input ref={expenseNameField} name='expenseName' onChange={expenseRowChange} type="text" placeholder="Expense Name"/>
                <input ref={expenseValueField} name='expenseValue' onChange={expenseRowChange} type="number" step={"0.01"} placeholder="$0.00"/>
                <select ref={expensePriorityField} name="expensePriority" onChange={expenseRowChange} id="priority" className="priority-dropdown dropdown">
                    <option value="">Priority</option>
                    <option value="Required">1 - Required</option>
                    <option value="High">2 - High</option>
                    <option value="Medium">3 - Medium</option>
                    <option value="Low">4 - Low</option>
                    <option value="Luxury">5 - Luxury</option>
                </select>
            </div>
            
            <table className="expense-table table">
                <tbody>
                    <tr className="expense-row">
                        <th className="edit-t-header">

                        </th>
                        <th className="table-header left-t-header">
                            Expense / Priority
                        </th>
                        <th className="table-header right-t-header">
                            Expense Value
                        </th>
                        <th className="delete-t-header"></th>
                        {/* <th className="priority-data"></th> */}
                        {/* <th className="table-header right-t-header priority-data">
                            Priority
                        </th> */}
                    </tr>
                    {
                        expenseRows.map((expenseRow) => (
                            <ExpenseRow key={expenseRow.index} data={expenseRow} delete={deleteExpenseRow} toggle={togglePopup}></ExpenseRow>
                        ))
                    }
                </tbody>
            </table>
            <table className="expense-table table total-table">
                <tbody>
                    <tr className="expense-row left-t-header">
                        <td className="total-expense">Total Expenses</td><td className="total-expense-value">${expenseTotal}</td>
                    </tr>
                </tbody>
            </table>

            <hr />

            <table className="surplus-table table total-table">
                <tbody>
                    {surplus < 0 && 
                        <tr className="surplus-row row">
                            <td>Surplus / Deficit</td><td className="surplus-data">${surplus.toFixed(2) * -1}</td>
                        </tr>
                    }
                    {surplus >= 0 &&
                        <tr className="surplus-row row">
                            <td>Surplus / Deficit</td><td className="surplus-data">${surplus.toFixed(2)}</td>
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