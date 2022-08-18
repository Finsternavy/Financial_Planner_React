import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Registration(){

    let navigate = useNavigate();

    const reg_Click = () => {
        // redirect to login screen
        let path = '/'
        navigate(path)
    }

    const cancel_Click = () => {
        // redirect to login screen
        let path = '/'
        navigate(path)
    }

    return(
        <div>
            <h1 className="header">User Registration</h1>
            <div className="form">
                <input type="text" className="email" placeholder="Enter Your Email"/>
                <input type="text" className="username" placeholder="Create a Username"/>
                <input type="password" className="password" placeholder="Create a Password"/>
                <input type="password" className="password-confirm" placeholder="Confirm Password"/>
            </div>
            <div className="btn-container">
                <button className="register-btn btn" onClick={reg_Click}>Register</button>
                <button className="register-btn btn" onClick={cancel_Click}>Cancel</button>
            </div>

        </div>
    )
}

export default Registration