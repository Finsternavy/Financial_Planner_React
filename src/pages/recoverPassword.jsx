import { useNavigate } from "react-router-dom"

function RecoverPassword() {

    let navigate = useNavigate()

    const send = () => {
        let path = '/recover-success'
        navigate(path)
    }

    const cancelRecovery = () => {
        let path = '/'
        navigate(path)
    }

    return (
        <div className="recover-password">
            <h1 className="header">Recover Password</h1>
            <div className="form">
                <input type="text" placeholder="Enter Your Username"/>
                <input type="text" placeholder="Enter Your Email"/>
            </div>
            <div className="btn-container">
                <button className="btn" onClick={send}>Send</button>
                <button className="btn cancel-btn" onClick={cancelRecovery}>Cancel</button>
            </div>
        </div>
    )
}

export default RecoverPassword