import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import Toggle from "../components/toggle"
import { wait } from "@testing-library/user-event/dist/utils";

const Navbar = () => {

    let navigate = useNavigate()

    let toggle_menu = (e, currentDropDown) => {
        currentDropDown = e.target.closest('[data-dropdown]')
        currentDropDown.classList.toggle('active')
    }

    let menu_Click = (e) => {
        const isPopOutLink = e.target.matches('[data-dropdown-button]')
        let currentDropDown
        if (isPopOutLink){
            toggle_menu(e, currentDropDown)
            // This commented code deactivates all button when the hamburger menu is open - doesn't work after clicking hamburger menu links
            // let list = document.querySelectorAll('.btn, .tile-btn, input, select')
            // list.forEach( btn => {
            // if (!btn.classList.contains('dont-disable')){
            //     btn.classList.toggle('disable')
            // }
            // })
        }else if (e.target.matches('.reg-btn')){
            toggle_menu(e, currentDropDown)
            let path = '/registration'
            navigate(path)
        }else if (e.target.matches('.log-out')){
            toggle_menu(e, currentDropDown)
            let path = '/'
            navigate(path)
        }else if (e.target.matches('.home')){
            toggle_menu(e, currentDropDown)
            let path = '/home'
            navigate(path)
        }
    }


    const registration_click = () => {
        let path = '/registration'
        navigate(path)
    }

    return (
        <div className="navbar">
            <div className="navbar-hamburger-container" data-dropdown>
                <div className="hamburger-container" onClick={menu_Click} data-dropdown-button>
                    <div className="hamburger" data-dropdown-button></div>
                </div>
                <div className="pop-out-link">
                    <Toggle/>
                    {/* This section will contain javascript to check if user is logged in and display different buttons depending on if user logged in or not */}
                    <div onClick={menu_Click} className="dont-disable log-out">Login</div>
                    <div onClick={menu_Click} className="dont-disable reg-btn">Register</div>
                    <div onClick={menu_Click} className="dont-disable home">Home</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar