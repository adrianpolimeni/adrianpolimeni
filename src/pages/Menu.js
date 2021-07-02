import React from "react";
import {
  Link
} from "react-router-dom";

function Menu() {
    return (
      <ul>
        <li>
          <Link to="/workspace/clock/Winnipeg/-5/New%20York/-4/London/1/Shenzhen/8">Clock</Link>
        </li>
        <li>
          <Link to="/workspace/weather/London">Weather</Link>
        </li>
      </ul>
    );
  }
  
  export default Menu;