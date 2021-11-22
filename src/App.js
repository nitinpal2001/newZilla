import React, { useState } from 'react'
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadSpinner from './Components/LoadSpinner';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  let categories = [
    { path: "/", category: "general" },
    { path: "/business", category: "business" },
    { path: "\entertainment", category: "entertainment" },
    { path: "\health", category: "health" },
    { path: "\science", category: "science" },
    { path: "\sports", category: "sports" },
    { path: "/technology", category: "technology" }
  ]

  let loaderProgress = (progress) => {
    setProgress(progress)
  }

  const apiKey=process.env.REACT_APP_NEWS_API_KEY;
  const [progress, setProgress] = useState(0)
  const pageSize = 5;
  const country = "in";
  
  const [mode, setMode] = useState('light')
  const toggleMode=()=>{
    if (mode=='light') {
      document.body.style.backgroundColor='black';
      document.getElementById('newsCard').style.backgroundColor="black";
      document.getElementById('newsCard').style.color="white";
      document.getElementById('newsCard').style.border="1px solid white";
      setMode('dark')
    }
    else{
      document.body.style.backgroundColor='white';
      document.getElementById('newsCard').style.backgroundColor="white";
      document.getElementById('newsCard').style.color="black";
      document.getElementById('newsCard').style.border="1px solid #00000020";
      setMode('light')
    }
  }

  return (
    <Router>
      <div className="App">
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Navbar toggleMode={toggleMode}/>
        <Switch>
          <Route exact path="/">
            <News apiKey={apiKey} mode={mode}  loaderProgress={loaderProgress} key="general" pageSize={pageSize} country={country} category="general" /></Route>
          <Route exact path="/business">
            <News apiKey={apiKey} mode={mode}  loaderProgress={loaderProgress} key="business" pageSize={pageSize} country={country} category="business" /></Route>
          <Route exact path="/entertainment">
            <News apiKey={apiKey} mode={mode}  loaderProgress={loaderProgress} key="entertainment" pageSize={pageSize} country={country} category="entertainment" /></Route>
          <Route exact path="/health">
            <News apiKey={apiKey} mode={mode}  loaderProgress={loaderProgress} key="health" pageSize={pageSize} country={country} category="health" /></Route>
          <Route exact path="/science">
            <News apiKey={apiKey} mode={mode}  loaderProgress={loaderProgress} key="science" pageSize={pageSize} country={country} category="science" /></Route>
          <Route exact path="/sports">
            <News apiKey={apiKey} mode={mode}  loaderProgress={loaderProgress} key="sports" pageSize={pageSize} country={country} category="sports" /></Route>
          <Route exact path="/technology">
            <News apiKey={apiKey} mode={mode}  loaderProgress={loaderProgress} key="technology" pageSize={pageSize} country={country} category="technology" /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
