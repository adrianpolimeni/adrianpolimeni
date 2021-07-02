
import React, { useEffect,useState } from "react";
import {
  useParams
} from "react-router-dom";

import './Weather.css';
import { Grid } from "@material-ui/core";


import 'bootstrap/dist/css/bootstrap.min.css';


export const Weather = () => {
  let {city} = useParams();
  const [fetched, setFetched] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({} as WeatherData);
  const API_KEY = "9350b208afb3087791c5ecf4020574ae";
  const width = window.innerWidth;


  function getCurrent() {
    return fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+API_KEY, {method:"GET"})
    .then(data => data.json())
  }
  function getForecast(coord:{lat:number, lon:number})
  {
    return fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+coord.lat+'&lon='+coord.lon+'&exclude=current,minutely,alerts&appid='+API_KEY, {method:"GET"}).then(data => data.json());
  }





  useEffect(() => {
    const fetchData = async () => {
      const resultCurrent = await getCurrent();
      const resultForecast= await getForecast(resultCurrent.coord);
      // parse data
      const weatherData : WeatherData = {
        city,
        currentTemp: Math.round(resultCurrent.main.temp - 273.15),
        tempMin: Math.round(resultForecast.daily[0].temp.min - 273.15),
        tempMax: Math.round(resultForecast.daily[0].temp.max - 273.15),
        weatherType: resultCurrent.weather[0].main,
        weatherTypeIcon: resultCurrent.weather[0].icon,
        hourlyForecast: resultForecast.hourly.map((item: any): HourlyData => 
        {
          var date = new Date(0);
          date.setUTCSeconds(item.dt );
          
          return (
            {
              hour: date.getHours() + date.getTimezoneOffset()/60 + (resultForecast.timezone_offset/3600),
              temp: Math.round(item.temp - 273.15),
              type: item.weather[0].main,
              icon: item.weather[0].icon
            });
        }),
        dailyForecast: resultForecast.daily.map((item: any): DailyData => 
        {
          var date = new Date(0);
          var weekday = new Array(7);
          weekday[0] = "Sunday";
          weekday[1] = "Monday";
          weekday[2] = "Tuesday";
          weekday[3] = "Wednesday";
          weekday[4] = "Thursday";
          weekday[5] = "Friday";
          weekday[6] = "Saturday";
          date.setUTCSeconds(item.dt);
          return (
            {
              day: weekday[date.getDay()],
              tempMin: Math.round(item.temp.min - 273.15),
              tempMax: Math.round(item.temp.max - 273.15),
              type: item.weather[0].main,
              icon: item.weather[0].icon,         
            });
        })
      };
      setWeatherInfo(weatherData);
    };
    fetchData();

  }, [city]);


  const SmallView = () => {
    const icon = 'http://openweathermap.org/img/wn/'+weatherInfo.weatherTypeIcon+'@2x.png';
    return (
        <Grid container direction="row"  justify="space-between" className="headerContainer">
          <Grid item>
          <Grid container direction="column" className="cityTempContainer">
            <span className="medText">{weatherInfo.city}</span>
            <div className="tempContainer">
              <span className="tempTitle">{weatherInfo.currentTemp}</span>
              <div className="deg">°C</div>
            </div>
            <span className="medText">{weatherInfo.weatherType}</span>
            <span className="medText">{weatherInfo.tempMin}° | {weatherInfo.tempMax}°</span>
          </Grid>
          </Grid>
          <img className="weatherIcon3" src={icon} alt="img"/>
        </Grid>
    );

  }


  const Header = ()=>
  {
    const icon = 'http://openweathermap.org/img/wn/'+weatherInfo.weatherTypeIcon+'@2x.png';
    return (
      <div className="headerContainer">
        <Grid container direction="row"  justify="space-between">
          <Grid item>
          <Grid container direction="column" className="cityTempContainer">
            <span className="medText">{weatherInfo.city}</span>
            <div className="tempContainer">
              <span className="tempTitle">{weatherInfo.currentTemp}</span>
              <div className="deg">°C</div>
            </div>
          </Grid>
          </Grid>
          <Grid item>
          <Grid container direction="column" className="weatherContainer">
            <img className="weatherIcon" src={icon} alt="img"/>
            <span className="medText">{weatherInfo.weatherType}</span>
            <span className="medText">{weatherInfo.tempMin}° | {weatherInfo.tempMax}°</span>
          </Grid>
          </Grid>
        </Grid>
        <div className="divider"></div>
      </div>
    );
  }

  const HourlyForcast = () => 
  {
    return(
      <div>
        
        <Grid container direction="row" justify="space-between" className="hourlyContainer">
          {weatherInfo.hourlyForecast?.map((item,index) => {
            if(index >= 8)
              return(<></>);
            return(
              <Grid direction="column" className="hourlyItem">
                <span className="medText"> {(item.hour%12)|| 12} {item.hour < 12 ? "AM": "PM"}</span>
                <img className="weatherIcon2" src={'http://openweathermap.org/img/wn/'+item.icon+'@2x.png'} />
                <span className="medText"> {item.temp}°</span>
              </Grid>
            );
          })}
      </Grid>
      <div className="divider"></div>
     </div>
    );
  }

  const WeeklyForcast = () => 
  {
    return(
        <div className="dailyContainer">
          {weatherInfo.dailyForecast?.map((item,index) => {
            if(index >= 7)
              return(<></>);
            return(
              <Grid direction="row" container justify="space-between" className="dailyItem">
                <span className="dailyText"> {item.day} </span>
                <img className="weatherIcon2" src={'http://openweathermap.org/img/wn/'+item.icon+'@2x.png'} />
                <span className="dailyText" style={{textAlign:"right"}}> {item.tempMin}° | {item.tempMax}°</span>
              </Grid>
            );
          })}
      </div>
    );
  }
  

  return (
    <div className="mainContainer">
      <div className="d-block d-sm-none">
        <SmallView/>
      </div>
      <div className="d-none d-sm-block">
        <Header/>
        <HourlyForcast/>
        <WeeklyForcast/>
      </div>
    </div>
  );
}

export interface WeatherData 
{
  city: string;
  currentTemp: number;
  tempMin: number;
  tempMax: number;
  weatherType: string;
  weatherTypeIcon: string
  hourlyForecast: HourlyData[]
  dailyForecast: DailyData[]
}

interface HourlyData
{
  hour: number;
  temp:number;
  type: string;
  icon: string;
}

interface DailyData
{
  day: string;
  tempMin:number;
  tempMax:number;
  type: string;
  icon: string;
}



export default Weather;