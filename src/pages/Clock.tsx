
import { Grid, Fade } from "@material-ui/core";
import React from "react";
import AnalogClock from "../components/AnalogClock";
import "./Clock.css"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from "react-router-dom";

export const Clock = () => {


  const Row = (name1: string, offset1 :number, name2 : string, offset2 : number) =>
  {
    let TZName1 = ((offset1 > 0) ? "+" : "") + offset1;
    let TZName2 = ((offset2 > 0) ? "+" : "") + offset2;
    return(
      <React.Fragment>
        <Grid container alignItems="center">
        <Grid item xs={6} >
          <AnalogClock timeZone={offset1} />
          <div className="main-label">{name1}</div>
          <div className="secondary-label">GMT {TZName1}</div>
        </Grid>
        <Grid item xs={6} >
          <AnalogClock timeZone={offset2} />
          <div className="main-label">{name2}</div>
          <div className="secondary-label">GMT {TZName2}</div>
        </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  const SingleClock = () => 
  {
    return(
      <AnalogClock timeZone={0}/>
    );
  }


  const ExpandedClock = () =>
  {
    let {city1,city2,city3,city4, TZ1,TZ2,TZ3,TZ4} = useParams();

    return(
      <Fade in timeout={1000}>
        <>
        <div className="d-sm-block d-md-none">
          <SingleClock/>
          <div className="pad"></div>
        </div>
        <div className="d-none d-md-block">
          <div className="content">
          <Grid container alignItems="center" spacing={0}>
              {Row (city1,+TZ1,city2,+TZ2)}
              {Row (city3,+TZ3,city4,+TZ4)}
          </Grid>
          </div>
        </div>
        </>
      </Fade>
    );
  };

  return (
    <div style={{backgroundColor:"#1F1F1F"}}>
      <Switch>
        <Route path="/clock/:city1/:TZ1/:city2/:TZ2/:city3/:TZ3/:city4/:TZ4" children={<ExpandedClock/>}/>
        <Route path="/clock" children={<SingleClock/>}/>
      </Switch>
    </div>
  );

  
}

export default Clock;