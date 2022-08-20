import { useState, useRef } from "react"
import "../components/addExpenseLineTool.css"

const AddExpenseLineTool = (props) => {

    const [expenseRow, setExpenseRow] = useState({
        expenseName: '',
        expenseValue: 0,
        expensePriority: '',
    })
    const expenseNameField = useRef(null)
    const expenseValueField = useRef(null)
    const expensePriorityField = useRef(null)
    const expenseAPRField = useRef(null)
    const expenseBalanceField = useRef(null)

    const expenseRowChange = (e) => {
        setExpenseRow(prev=>({...prev, ['index']:props.index}))
        setExpenseRow(prev=>({...prev, [e.target.name]:e.target.value}))
    }

    const updateExpenseValue = () => {
        let convertedExpense = parseFloat(expenseRow.expenseValue).toFixed(2)
        let copy = expenseRow
        copy['expenseValue'] = parseFloat(convertedExpense).toFixed(2)
        setExpenseRow(prev=> prev = copy)
        
    }

    const addExpenseRow = () => {
        updateExpenseValue()
        console.log(expenseRow.expenseName)
        console.log(expenseRow.expenseValue)
        console.log(expenseRow.expensePriority)
        if (!expenseRow.expenseName || !expenseRow.expenseValue || !expenseRow.expensePriority){
            alert('Please complete all expense fields')
            return
        }
        // convertIncomeFrequency()
        clearInputFields()
        props.update(expenseRow)
        setExpenseRow({})
    }

    const clearInputFields = () => {
        expenseNameField.current.value = ''
        expenseValueField.current.value = ''
        expensePriorityField.current.value = ''
        expenseAPRField.current.value = ''
        expenseBalanceField.current.value = ''

        expenseNameField.current.placeholder ='Expense Name'
        expenseValueField.current.placeholder ='$0.00'
        expensePriorityField.current.placeholder = "Priority"
        expenseAPRField.current.placeholder = 'APR %'
        expenseBalanceField.current.placeholder = 'Remaining Payments'
        
    }

    return(

        <div className="add-expense-line-tool">
            {/* <div className="add-btn-container">
                <button className="open-btn" onClick={toggleTool}>Open Insert Tool</button>
            </div> */}
            <input ref={expenseNameField} name="expenseName" type="text" placeholder="Expense Name" onChange={expenseRowChange}/>
            <input ref={expenseValueField} name="expenseValue" type="number" step={"0.01"} placeholder="0.00" onChange={expenseRowChange}/>
            <select ref={expensePriorityField} name='expensePriority' id="priority" onChange={expenseRowChange} className="priority-dropdown dropdown">
                <option value="">Priority</option>
                <option value="Required">1 - Required</option>
                <option value="Financed">2 - Financed</option>
                <option value="High">3 - High</option>
                <option value="Medium">4 - Medium</option>
                <option value="Low">5 - Low</option>
                <option value="Luxury">6 - Luxury</option>
            </select>
            {
                expenseRow.expensePriority === 'Financed' && 
                <>
                    <div className="loan-info">Loan Info</div>
                    <input ref={expenseAPRField} className="apr" name='apr' onChange={expenseRowChange} type="number" step={"0.01"} placeholder="APR %"/>
                    <input ref={expenseBalanceField} className="balance" name='balance' onChange={expenseRowChange} type="number" step={"0.01"} placeholder="Loan Balance"/>
                </>
            }
            <div className="tool-btn-container">
                <button className="tool-btn expense-tool-btn" onClick={addExpenseRow}>Insert Item</button>
            </div>

        </div>
    )
}

export default AddExpenseLineTool