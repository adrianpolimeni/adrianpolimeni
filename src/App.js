
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import Menu from "./pages/Menu";
import Clock from "./pages/Clock";
import Weather from "./pages/Weather";


function App() {
  return (
    <Router basename="/workspace">
        <Switch>
          <Route exact path="/">
            <Menu />
          </Route>
          <Route path="/clock">
            <Clock />
          </Route>
          <Route path="/weather/:city">
            <Weather />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
