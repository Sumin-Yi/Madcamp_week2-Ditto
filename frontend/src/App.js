import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Datemap from './components/Datemap';
import Upload from './components/Upload' ;
import React, {useState, useEffect} from 'react';
import KeywordSearch from './components/KeywordSearch';
import Landing from "./components/Landing"

function App() {

  console.log("start")


  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Landing/>}/>
        <Route path = "/map" element={<Datemap search = {"대전 봉명동 카페"}/>}/>
        <Route path = "/upload" element = {<Upload/>}/>
        <Route path = '/keywordsearch' element = {<KeywordSearch/>}/>
      </Routes>
    </Router>
  );
}

export default App
