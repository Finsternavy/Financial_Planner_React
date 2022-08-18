

const Row = (props) => {

    const show = (changes) => {
        // const edit = document.querySelector('.popup')
        // edit.classList.add('show')
        // props.edit(props.data.index, changes)
        console.log("got here")
        props.toggle(props.data.index)
    }

    const deleteRow = () => {
        props.delete(props.data.index)
    }

    return(
            <tr className="income-row">
                <td className="data">{props.data.source}</td>
                <td className="income-data data">${props.data.value}</td>
                <td className="crud-col">
                    <button className="row-btn" onClick={show}>Edit</button>
                </td>
                <td className="crud-col" onClick={deleteRow}>
                    <button className="row-btn last-row-btn">X</button>
                </td>
            </tr>
    )
}

export default Row