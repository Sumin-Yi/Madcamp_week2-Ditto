import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Datemap from './components/Datemap';
import Upload from './components/Upload' ;
import KeywordSearch from './components/KeywordSearch';
import Landing from "./components/Landing"
import Login from './components/Login'
import SignUp from './components/Signup'
import MyLists from './components/MyLists'
import ImageSearch from './components/ImageSearch'
import React, { useState, useEffect } from 'react'
import './App.css'

function App(){

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
            <Route exact path="/" element={<Landing />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/my-lists" element={<MyLists />} />
            <Route path="/image-search" element={<ImageSearch />} />
            <Route path = "/map" element={<Datemap search = {"대전 봉명동 카페"}/>}/>
            <Route path = "/upload" element = {<Upload/>}/>
            <Route path = '/keywordsearch' element = {<KeywordSearch/>}/>
        </Routes>
        </div>
    </div>
    </div>
</Router>
  );
}

export default App
