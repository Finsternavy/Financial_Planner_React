import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../components/newBudget.css"


const NewBudget = () => {

    const [incomeRow, setIncomeRow] = useState({
        source: "",
        value: 0,
        frequency: '/monthly',
        hours: 0,
    })
    const [incomeRows, setIncomeRows] = useState([])
    const [expenseRow, setExpenseRow] = useState({
        expenseName: "",
        expenseValue: 0,
        expensePriority: 1,
    })
    const [expenseRows, setExpenseRows] = useState([])
    const [index, setIndex] = useState(0)
    const [surplus, setSurplus] = useState(0)

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
            convertedIncome = incomeRow.value
        }
        let copy = incomeRow
        copy['value'] = parseFloat(convertedIncome)
        console.log(convertedIncome)
        setIncomeRow(prev => prev = copy) 
    }
    
    const addIncomeRow = () => {
        console.log(parseFloat(incomeRow.value))
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
        console.log(incomeRow)
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
        let convertedExpense = expenseRow.expenseValue
        
        console.log(expenseRow.expenseValue.type)
        let copy = expenseRow
        copy['expenseValue'] = parseFloat(convertedExpense)
        console.log(copy)
        setExpenseRow(prev => prev = copy)
    }

    const addExpenseRow = () => {
        if (!expenseRow['expenseName'] || !expenseRow['expenseValue'] || !expenseRow['expensePriority']){
            alert('Please complete all expense fields')
            return
        }
        setIndex(index + 1)
        updateExpenseList()
        let newSurplus = surplus - expenseRow.expenseValue
        console.log(newSurplus + " newsurplus")
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
        console.log(newSurplus)
    
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

    const editRow = (rowIndex) => {
        alert({})
    }

    const deleteRow = (rowIndex) => {

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
            

            {/* template data for testing only ---- remove when implementing logic  ------  */}
            <table className="income-table table">
                <tbody>
                    <tr>
                        <th className="table-header left-t-header">
                            Income Source
                        </th>
                        <th className="table-header right-t-header">
                            Income Value (Per Month)
                        </th>
                    </tr>
                    {
                        incomeRows.map((incomeRow) => (
                        <tr key={incomeRow.index} className="income-row row">
                            <td key={incomeRow.source}>{incomeRow.source}</td>
                            <td key={incomeRow.value} className="income-data data">${incomeRow.value.toFixed(2)}</td>
                            {/* <td key={incomeRow.index + incomeRow.source} className="crud-col">
                                <button className="row-btn" onClick={editRow}>Edit</button>
                            </td>
                            <td key={incomeRow.index + incomeRow.source + incomeRow.index} className="crud-col" onClick={deleteRow}>
                                <button className="row-btn">X</button>
                            </td> */}
                        </tr>
                        ))
                    }
                    {/* <td>Employment</td><td className="income-data data">$4,000.00 / Monthly</td> */}
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
                        <th className="table-header left-t-header">
                            Expense / Priority
                        </th>
                        <th className="table-header center-t-header">
                            Expense Value
                        </th>
                        {/* <th className="priority-data"></th> */}
                        {/* <th className="table-header right-t-header priority-data">
                            Priority
                        </th> */}
                    </tr>
                    {
                        expenseRows.map((expenseRow) => (
                        <tr key={expenseRow.index} className="expense-row row">
                            <td key={expenseRow.expenseName}>{expenseRow.expenseName} : {expenseRow.expensePriority}</td>
                            <td key={expenseRow.expenseValue} className="expense-data data">${expenseRow.expenseValue.toFixed(2)}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>

            <hr />

            <table className="surplus-table table">
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

            {/* template data for testing only ---- remove when implementing logic  ------  */}

            <div className="btn-container">
                <button className="btn" onClick={saveBudget}>Save Budget</button>
                <button className="btn" onClick={budgetHome}>Budget Home</button>
            </div>
        </div>
    )
}

export default NewBudget