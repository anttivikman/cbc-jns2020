import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Fruits from "./Components/Fruits";
import Cars from "./Components/Cars";
import Corona from "./Components/Corona";

// All new
function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/fruits">
          <Fruits />
        </Route>
        <Route path="/cars">
          <Cars />
        </Route>
        <Route path="/corona" component={Corona} />
        <Route render={() => "404 - Not Found!"} />
      </Switch>
    </Router>
  );
}

export default App;
