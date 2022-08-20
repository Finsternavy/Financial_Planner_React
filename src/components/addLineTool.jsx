

const AddLineTool = (props) => {



    return(

        <div className="add-line-tool">
            <input type="text" placeholder="Source of Income Title"/>
            <input type="number" step={"0.01"} placeholder="0.00"/>
            <select ref={props.ref} name='frequency' id="frequency" onChange={update} className="frequency-dropdown dropdown">
                <option value="">Frequency</option>
                <option value="/hourly">Hourly</option>
                <option value="/weekly">Weekly</option>
                <option value="/bi-weekly">Bi-weekly</option>
                <option value="/monthly">Monthly</option>
                <option value="/1st/15th">1st and 15th</option>
                <option value="/annualy">Annualy</option>
            </select>
        </div>
    )
}

export default AddLineTool