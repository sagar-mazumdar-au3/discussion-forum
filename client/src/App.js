import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./Nav";
import Main from "./Main";
import './App.css';

function App() {
  return (
    <Router>
     <Nav/>
     <Main/>
    </Router>
  );
}

export default App;
