import { useState } from 'react'
import { useEffect } from 'react';

import './App.css';

  // inputImage
  import search from'./assets/weather-images/searchclick.png';
  import snownight from'./assets/weather-images/snownight.png';
  import weather from './assets/weather-images/weather.png';
  import windfarm from './assets/weather-images/windfarm.png';
  import thunder from './assets/weather-images/thunder.png';
  import snow from './assets/weather-images/snow.png';
  import showerrain from './assets/weather-images/showerrain.png';
  import scatteredcloud from './assets/weather-images/scatteredcloud.png';
  import brokencloud from './assets/weather-images/brokencloud.png';
  import rainnight from './assets/weather-images/rainnight.png';
  import rain from './assets/weather-images/rain.png';
  import nightfewcloud from './assets/weather-images/nightfewcloud.png';
  import mist from './assets/weather-images/mist.png';
  import fewcloud from './assets/weather-images/fewcloud.png';
  import cloudynight from './assets/weather-images/cloudynight.png';
  import clearsky from './assets/weather-images/clearsky.png';
  import clearnight from './assets/weather-images/clearnight.png';

  const key='8d312ea85ca24b56c872e5d285cf08e4';
  function Weatherdetails({icon,Temp,city,country,lat,log,humi,windspeed}){
    return (
      <>
      <div className='top'>
      <div className='images'> 
         <img src={icon} alt="Image" />
      </div>

      
      <div className='temp'>{Temp}°C</div>
      <div className='location'>{city}</div>
      <div className='country'>{country}</div>
      </div>
      <div className='bottom'>
      <div className='cord'>
      <div>
        <span className='lat'>Latitude</span>
        <span >{lat}</span>
      </div>
      <div>
        <span className='log'>Longitude</span>
        <span >{log}</span>
      </div>
      </div>
      <div className='data-container'>
        <div className='element'>
          <img src={weather} style={{width:'50px',height:'50px'}} alt="humidity" />
          <div className='data'>
          <div className='humidity-percent'>{humi}%</div>
          <div className='humidity-text'>humidity</div>
          
          </div>
        </div>
        <div className='element'>
          <img src={windfarm} style={{width:'50px',height:'50px'}} alt="wind" />
          <div className='data'>
          <div className='wind-percent'>{windspeed}km/h</div>
          <div className='wind-text'>wind Speed</div>
          
          </div>
        </div>
        </div>
        
        
      </div>
      </>
    )
  }

 
 
function App() {
  const[text,settext]=useState('dindigul');
  const[icon,seticon]=useState(clearsky);
  const[Temp,setTemp]=useState(13);
  const[city,setcity]=useState('dindigul');
  const[country,setcountry]=useState('India');
  const[lat,setlat]=useState(23);
  const[log,setlog]=useState(93);
  const[humi,sethumi]=useState(45);
  const[windspeed,setwindspeed]=useState(10);
  const[loading,setloading]=useState(false);
  const[citynotfound,setcitynotfound]=useState(false);

  const weatherIcon={
    "01d":clearsky,
    "02d":fewcloud,
    "03d":scatteredcloud,
    "04d":brokencloud,
    "09d":showerrain,
    "10d":rain,
    "11d":thunder,
    "13d":snow,
    "50d":mist,
    "01n":clearnight,
    "02n":nightfewcloud,
    "03n":cloudynight,
    "04n":brokencloud,
    "09n":showerrain,
    "10n":rainnight,
    "11n":thunder,
    "13n":snownight,
    "50n":mist,
    

  };
 
  async function api(){
    
    try{
      setloading(true);
      const url= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${key}&units=Metric`);
      const res= await url.json();
      if(res.cod==='404'){
        console.error("city not found");
       
        setloading(false);
        return;
      }
      else{
        setcity(res.name);
        setcountry(res.sys.country);
        sethumi(res.main.humidity);
        setlat(res.coord.lat);
        setlog(res.coord.lon);
        setTemp(Math.floor(res.main.temp));
        setwindspeed(res.wind.speed);
        const weathericoncode=res.weather[0].icon;
        seticon(weatherIcon[weathericoncode] || clearsky);
        setcitynotfound(false);



      }

    }catch(errror){
      console.log(errror+ 'is found');

    }finally{
      setloading(false);

    }

  }

  useEffect(()=>{
    api();
  },[]);

 const handlecity=(e)=>{

   return settext(e.target.value)

 }
 const handlekey=(e)=>{

 if(e.key==='Enter'){
  api();
 }

}
  
 

  return (
    <>
    <div className='container'>
      <div className='input-container'>

      <input className='cityInput'
      placeholder='Search City' value={text} 
      onChange={handlecity} onKeyDown={handlekey}/>
      <div className='search-container'>
        <img src={search} alt=" Search" 
        className='searchicon' onClick={()=>{api()}}/>
      </div>

      </div>
      <Weatherdetails  icon={icon} Temp={Temp}
      city={city}  country={country}
      lat={lat} log={log}
      humi={humi} windspeed={windspeed}/>

      
   <p className='copyright'>
    Designed by <span className='name'>Hari</span>
   </p>


    </div>
   
    
    
    </>
  )
   
  
}

export default App
