import "../components/row.css"

const ExpenseRow = (props) => {

    const edit = () => {
        props.toggle(props.data)
    }

    const deleteRow = () => {
        props.delete(props.data._id)
    }


    return (
        <tr className="expense-row">
            <td className="crud-col edit-row">
                <button className="row-btn edit-btn" onClick={edit}>Edit</button>
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