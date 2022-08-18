import { useNavigate } from "react-router-dom"

function RecoverSuccess() {

    let navigate = useNavigate()

    const toLogin = () => {
        let path = '/'
        navigate(path)
    }

    return (
        <div className="recover-success">
            <h1 className="header">Account Recovery Successfully Sent!</h1>
            <h3 className="text">Check your email for account recovery information.</h3>
            <div className="btn-container">
                <button className="btn" onClick={toLogin}>Login</button>
            </div>
        </div>
    )
}

export default RecoverSuccess