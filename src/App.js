
import React from "react";
import {
  Switch,
  Route,
  useParams
} from "react-router-dom";


import Menu from "./pages/Menu";
import Clock from "./pages/Clock";
import Weather from "./pages/Weather";
import Tasks from "./pages/Tasks";
import Music from "./pages/Music";

function App() {




  return (
    <Switch>
      <Route exact path="/">
        <Menu />
      </Route>
      <Route path="/:access_token(access_token=.*)"component={Music} />
      <Route path="/clock">
        <Clock />
      </Route>
      <Route path="/weather/:city">
        <Weather />
      </Route>
      <Route path="/tasks">
        <Tasks />
      </Route>
      <Route path="/music">
        <Music />
      </Route>
    </Switch>
  );
}

export default App;
