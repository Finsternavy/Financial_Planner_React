import { useState } from "react"

const Popup = (props) => {

    const [changes, setChanges] = useState({
        source: "",
        value: 0,
    })

    const onChange = (e) => {
        setChanges(prev=> ({...prev, [e.target.name]:e.target.value}))
    }

    const edit = () => {
        props.edit(changes)
    }

    const cancel = () => {
        props.toggle(changes)
    }


    return (
        <div className="popup">
            <div className="form">
                <input name="source" onChange={onChange} type="text" placeholder="New Name / Source"/>
                <input name="value" onChange={onChange} type="number" placeholder="New Value"/>
            </div>
            <div className="btn-container">
                <button className="btn" onClick={edit}>Submit Changes</button>
                <button className="btn" onClick={cancel}>Cancel Edit</button>
            </div>
        </div>
    )
}

export default Popup