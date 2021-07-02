import React from "react";
import {
  Link
} from "react-router-dom";

function Menu() {
    return (
      <ul>
        <li>
          <Link to="/clock">Clock</Link>
        </li>
        <li>
          <Link to="/weather">Weather</Link>
        </li>
      </ul>
    );
  }
  
  export default Menu;