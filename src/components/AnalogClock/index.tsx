import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ClockBorder from './resources/clockborder.svg';
import HourHand from './resources/hourhand.svg';
import MinuteHand from './resources/minutehand.svg';
import SecondHand from './resources/secondhand.svg';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

export const AnalogClock = ({
  timeZone = 0,
}: 
{
  timeZone: number;
})  => {

  const [date, setDate] = useState(new Date());
  let min = date.getMinutes();
  let hour = (date.getHours() + (date.getTimezoneOffset()/60) + timeZone) % 24;
  let sec = date.getSeconds();

  useEffect(() => {
    var timerID = setInterval( () => tick(), 1000 );
    return function cleanup() {
        clearInterval(timerID);
      };
   });

  const tick = () => {
    setDate(new Date());
  }

  const pad = (num : string, size : number) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  };

  const clockText = () =>
  {
    //console.log(date.getHours()+", "+(date.getTimezoneOffset()/60) +", "+ timeZone);
    hour = (date.getHours()+(date.getTimezoneOffset()/60) + timeZone)%24;
   // console.log(hour);
    return(
      <div className="text-container">
        <Row>
            <span className="ampm-text">{(hour < 12) ? "AM" : "PM"}</span>
        </Row>
        <Row>
          <span className="time-text">{((hour)%12 || 12)}:{pad(""+min,2)}</span>
        </Row>
      </div>  
    );
  }

  const secStyles = { 
    transform: `rotate(${sec*6}deg)`,
  };
  const minStyles = { 
    transform: `rotate(${min*6}deg)`,
  };
  const hourStyles = { 
    transform: `rotate(${(((hour)%12))*30}deg)` 
  };


  return (
    <div className="content">
      <img className="clock" src={ClockBorder} alt=""/>
      <img className="clock-imgs" src={SecondHand} style={secStyles} alt=""/>
      <img className="clock-imgs" src={HourHand} style={hourStyles} alt="" />
      <img className="clock-imgs" src={MinuteHand} style={minStyles} alt=""/> 
      {clockText()}
  </div>
  );
}


export default AnalogClock;