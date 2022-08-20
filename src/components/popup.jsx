import { useState } from "react"
import "../components/popup.css"

const Popup = (props) => {

    const [changes, setChanges] = useState({
        source: props.editName,
        value: props.editValue,
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
            <div className="popup-container">
                <div className="popup-form">
                    <input className="name-input" name="source" onChange={onChange} type="text" placeholder="New Name / Source"/>
                    <input className="value-input" name="value" onChange={onChange} type="number" placeholder="New Value"/>
                </div>
                <div className="popup-btn-container">
                    <button className="popup-submit-btn" onClick={edit}>Submit Changes</button>
                    <button className="popup-cancel-btn" onClick={cancel}>Cancel Edit</button>
                </div>
            </div>
        </div>
    )
}

export default Popup