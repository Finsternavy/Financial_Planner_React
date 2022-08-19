import "../components/row.css"

const ExpenseRow = (props) => {

    const show = (changes) => {
        console.log("got here")
        props.toggle(props.data.index)
    }

    const deleteRow = () => {
        props.delete(props.data.index)
    }


    return (
        <tr className="expense-row">
            <td className="crud-col edit-row">
                <button className="row-btn edit-btn" onClick={show}>Edit</button>
            </td>
            <td className="data">{props.data.expenseName} : {props.data.expensePriority}</td>
            <td className="expense-data data">${props.data.expenseValue}</td>
            <td className="crud-col delete-row" onClick={deleteRow}>
                <button className="row-btn delete-btn">X</button>
            </td>
        </tr>
    )
}

export default ExpenseRow