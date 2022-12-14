import { useNavigate } from "react-router-dom"
import "../components/financeCalc.css"

const MortgageCalculator = () => {

    let navigate = useNavigate()

    return (
        <div className="mortgage-calculator">
            <h1 className="header">Mortgage Calculator</h1>
            <h3 className="note">Optional fields use national average if no value is provided.</h3>
            <div className="form">
                <input type="text" placeholder="Enter Home Price" className="price" />
                <select className="dropdown" name="term" id="term">
                    <option value="" >Term</option>
                    <option value="30">30 Year</option>
                    <option value="15">15 Year</option>
                </select>
                <input type="number" step={'0.01'} placeholder="APR %"/>
                <input type="number" step={'0.01'} placeholder="Property Tax (Optional)"/>
                <input type="number" step={'0.01'} placeholder="Insurance (Optional)"/>
                <input type="number" step={'0.01'} placeholder="Down Payment"/>
                <h3 className="note va-note">Va Loan?</h3>
                <select className="dropdown" name="va" id="va">
                    <option value="">VA Loan?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <input type="number" step={'0.01'} placeholder="Mortgage Insurance (Optional)"/>
            </div>
            <div className="btn-container">
                <button className="btn">Calculate</button>
            </div>
            <table className="table">
                <tbody>
                    <tr>
                        <td>Estimated Mortgage</td><td>$1,700.00</td>
                    </tr>
                    <tr>
                        <td>Estimated Mortgage</td><td>$1,700.00</td>
                    </tr>
                    <tr>
                        <td>Estimated Mortgage</td><td>$1,700.00</td>
                    </tr>
                    <tr>
                        <td>Estimated Mortgage</td><td className="surplus-data surplus">$1,700.00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default MortgageCalculator