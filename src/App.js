import './App.css';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import { useContext } from 'react';
import Login from "./pages/login"
import Registration from "./pages/registration"
import Home from "./pages/home"
import Navbar from "./components/navbar"
import RecoverUserName from './pages/recoverUsername';
import RecoverPassword from './pages/recoverPassword';
import RecoverSuccess from './pages/recoverSuccess';
import BudgetHome from './pages/budgetHome';
import NewBudget from './pages/newBudget';
import MortgageCalculator from './pages/mortgageCalculator';
import GlobalDataProvider from './context/globalDataProvider';

function App() {
  return (
    <div className="App">
      {/* Add context wrapper later */}
      <GlobalDataProvider>
        <Router>
          <Navbar/>
          <Routes>
            {/* How a route should be formatted */}
            <Route path="/" exact element={<Login/>}/>
            <Route path="/registration" exact element={<Registration/>}/>
            <Route path="/home" exact element={<Home/>}/>
            <Route path="/recover-username" exact element={<RecoverUserName/>}/>
            <Route path="/recover-password" exact element={<RecoverPassword/>}/>
            <Route path="/recover-success" exact element={<RecoverSuccess/>}/>
            <Route path="/budget-home" exact element={<BudgetHome/>}/>
            <Route path="/new-budget" exact element={<NewBudget/>}/>
            <Route path="/mortgage-calculator" exact element={<MortgageCalculator/>}/>
          </Routes>
        </Router>
      </GlobalDataProvider>
    </div>
  );
}

export default App;
