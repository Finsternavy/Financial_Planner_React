import "../components/row.css"

const IncomeRow = (props) => {

    const edit = () => {
        console.log("got here")
        props.toggle(props.data)
    }

    const deleteRow = () => {
        props.delete(props.data.index)
    }

    return(
        <tr className="income-row">
            <td className="crud-col edit-row">
                <button className="row-btn edit-btn" onClick={edit}>Edit</button>
            </td>
            <td className="data">{props.data.source}</td>
            <td className="income-data data">${props.data.value}</td>
            <td className="crud-col delete-row" onClick={deleteRow}>
                <button className="row-btn delete-btn">X</button>
            </td>
        </tr>
    )
}

export default IncomeRow