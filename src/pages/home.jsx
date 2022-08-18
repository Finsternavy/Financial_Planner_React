import "../components/home.css"
import { useNavigate } from "react-router-dom"
import Tile from "../components/tile"

function Home() {

    let navigate = useNavigate()

    const logout = () => {
        let path = '/'
        navigate(path)
    }

    return (
        <div className="home">
            <div className="tile-container">
                <Tile className="budget-tile" title="My Budgets" path="/budget-home"/>
                <Tile title="Debt Snowball" path="/my-budgets-home"/>
                <Tile title="Financial Goals" path="/my-budgets-home"/>
                <Tile title="Mortgage Calculator" path="/mortgage-calculator"/>
                <Tile title="Auto Finance Calculator" path="/my-budgets-home"/>
            </div>
            <div className="btn-container">
                <button className="btn main-menu-btn" onClick={logout}>Log Out</button>
            </div>
        </div>
    )
}

export default Home