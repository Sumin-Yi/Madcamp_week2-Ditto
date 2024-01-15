import React, { useState, useEffect } from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/Login'
import SignUp from './components/Signup'
import MyLists from './components/MyLists'

function App() {

//   const [data, setData] = useState([{}])

//   useEffect(() => {
//       fetch("http://143.248.197.57:3000/api").then(
//           res => res.json()
//       ).then(
//           data => {
//               setData(data);
//               console.log(data)
//           }
//       )
//   }, [])
  return (
    <Router>
        <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
                Ditto
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={'/sign-in'}>
                    Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                    </Link>
                </li>
                </ul>
            </div>
            </div>
        </nav>

        <div className="auth-wrapper">
            <div className="auth-inner">
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/my-lists" element={<MyLists />} />
            </Routes>
            </div>
        </div>
        </div>
    </Router>
  )
}

export default App
