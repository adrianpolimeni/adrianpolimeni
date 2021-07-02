import React from "react";
import {
  Link
} from "react-router-dom";

function Menu() {
    return (
      <ul>
        <li>
          <Link to="/workspace/clock">Clock</Link>
        </li>
        <li>
          <Link to="/workspace/weather/London">Weather</Link>
        </li>
      </ul>
    );
  }
  
  export default Menu;