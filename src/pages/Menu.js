import React from "react";
import {
  Link
} from "react-router-dom";

function Menu() {
    return (
      <ul>
        <li>
          <Link to="/clock/Winnipeg/-5/New%20York/-4/London/1/Shenzhen/8">Clock</Link>
        </li>
        <li>
          <Link to="/weather/London">Weather</Link>
        </li>
        <li>
          <Link to="/tasks">Tasks</Link>
        </li>
      </ul>
    );
  }
  
  export default Menu;