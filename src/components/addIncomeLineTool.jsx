import { useState, useRef } from "react"

const AddIncomeLineTool = (props) => {

    const [incomeRow, setIncomeRow] = useState({
        source: "",
        value: 0,
        frequency: '/monthly',
        hours: 0,
    })
    const incomeSourceField = useRef(null)
    const incomeValueField = useRef(null)
    const incomeFrequencyField = useRef(null)
    const incomeHourlyField = useRef(null)

    const incomeRowChange = (e) => {
        setIncomeRow(prev=>({...prev, ['index']:props.index}))
        setIncomeRow(prev=>({...prev, [e.target.name]:e.target.value}))
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
        setIncomeRow(prev => prev = copy) 
    }

    const addIncomeRow = () => {
        convertIncomeFrequency()
        clearInputFields()
        props.update(incomeRow)
        setIncomeRow({})
    }

    const clearInputFields = () => {
        incomeSourceField.current.value = ''
        incomeValueField.current.value = ''
        incomeFrequencyField.current.value = ''
        setIncomeRow(prev => ({...prev, ['hours']:0}))

        incomeSourceField.current.placeholder ='Source of Income Title'
        incomeValueField.current.placeholder ='$0.00'
        incomeFrequencyField.current.placeholder = "/monthly"
        
    }


    return(

        <div className="add-income-line-tool">
            <input ref={incomeSourceField} name="source" type="text" placeholder="Source of Income" onChange={incomeRowChange}/>
            <input ref={incomeValueField} name="value" type="number" step={"0.01"} placeholder="0.00" onChange={incomeRowChange}/>
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
                incomeRow.frequency === '/hourly' && <input ref={incomeHourlyField} className="hours" name='hours' onChange={incomeRowChange} type="number" step={"0"} placeholder="Hours a week"/>
            }
            <div className="tool-btn-container">
                <button className="tool-btn" onClick={addIncomeRow}>Insert Item</button>
            </div>

        </div>
    )
}

export default AddIncomeLineTool