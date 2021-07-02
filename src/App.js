
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
    <p>Test Adrian Polimeni</p>
    /*<Router>
        <Switch>
          <Route exact path="/workspace">
            <Menu />
          </Route>
          <Route path="/workspace/clock">
            <Clock />
          </Route>
          <Route path="/workspace/weather/:city">
            <Weather />
          </Route>
        </Switch>
    </Router>*/
  );
}

export default App;
