
import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";


import Menu from "./pages/Menu";
import Clock from "./pages/Clock";
import Weather from "./pages/Weather";


function App() {
  return (
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
  );
}

export default App;
