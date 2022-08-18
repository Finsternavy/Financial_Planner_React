import "../components/login.css";
import logo from "../img/logo-no-bg.png" 
// import alt from "../img/logo-fancy-bright.png"
import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";

function Login() {

  let [logoState, setLogoState] = useState(0)

  let navigate = useNavigate();

  const onChange = (e) => {
  //   let name = e.target.name;
  //   let val = e.target.value;

  //   let copy = {...loginAttempt};
  //   copy[name] = val;
  //   setLoginAttempt(copy);
  //   console.log(copy);
  }

  const login = ()=>{
    let path="/home"
    navigate(path)
  //   users.forEach((user) => {
  //     if(user['email'] === loginAttempt['email']){

  //       if(user['password'] === loginAttempt['password']){
  //         addCurrentUser(user);
  //         let path = '/Home';
  //         navigate(path);
  //         return;
  //       }
  //       console.log('Incorrect Password');
  //       return;
  //     }
  //     console.log("Emaill not found.  Please click register to get started!");
  //   })
  }

  const register = () => {
    let path = '/Registration'
    navigate(path);
  }

  const forgotUsername = () => {
    let path = '/recover-username'
    navigate(path)
  }

  const forgotPassword = () => {
    let path = '/recover-password'
    navigate(path)
  }

  // works on delay.  Requires page reload.  Maybe need to be async? Not sure.  Will look into issue.
  // const check_mode = () => {
  //   let root = document.documentElement
  //   let mode = root.style.getPropertyValue('--background-color')
  //   if (root.style.getPropertyValue('--background-color') === '#ffffff'){
  //     return <img src={alt} alt="" className="logo" />
  //   }else{
  //     return <img src={logo} alt="" className="logo" />
  //   }
  // }

  return (
    <div className="login">
        <h1 className="header">Financial Planner</h1>
        {/* {check_mode()} */}
        <img src={logo} alt="" className="logo" />
        <div className="form">
            <input name="email" onChange={onChange} type="text" placeholder="Email"/>
            <input name="password" onChange={onChange} type="password" placeholder="Password" />
            <div className="btn-container">
              <button className="login-btn login-page-btn btn" onClick={login}>Login</button>
              <button className="register-btn login-page-btn btn" onClick={register}>Register</button>
            </div>
            <div className="recover-links">
              <button className="recover-link" onClick={forgotUsername}>Forgot Username</button>
              <button className="recover-link" onClick={forgotPassword}>Forgot Password</button>
            </div>
        </div>
    </div>
  )
}

export default Login