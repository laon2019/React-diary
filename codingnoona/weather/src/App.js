import {useEffect, useState} from "react";
import './App.css';
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from "react-spinners/ClipLoader";

const cities = ['paris', 'new york', 'tokyo', 'seoul'];

function App() {
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const [loading,setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");
  
  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat,lon)
    });
  }

  const getWeatherByCurrentLocation = async(lat,lon) =>{
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c69b878db006e4b1894d961674a0a3a7&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data)
    setLoading(false);
    } catch (err) {
      setAPIError(err.message)
      setLoading(false);
    }
  }

  const getWeatherByCity = async() =>{
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c69b878db006e4b1894d961674a0a3a7&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(city==null){
      getCurrentLocation();
    } else{
      getWeatherByCity();
    }
  },[city])

  const handelCityChange = (city) =>{
    if(city ==="current"){
      setCity(null)
    } else{
      setCity(city)
    }
  }

  return (
    <div>
      {loading ?( <div className="container">
          <ClipLoader color="#f88c6b"loading={loading} size={150}/>
        </div>
        ):!apiError ?(
        <div className="container">
        <WeatherBox weather={weather}/>
        <WeatherButton cities={cities} setCity={setCity} handelCityChange={handelCityChange} selectedCity={city}/>
      </div>
      ):(apiError)}
    </div>
  );
}

export default App;