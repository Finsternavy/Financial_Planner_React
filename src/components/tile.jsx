import { useNavigate } from "react-router-dom"

function Tile(props) {

    let navigate = useNavigate()

    const on_click = () => {
        navigate(props.path)
    }

    return (
        <div className="tile-btn-container">
                <button className="tile-btn" onClick={on_click}>{props.title}</button>
        </div>
    )
}

export default Tile