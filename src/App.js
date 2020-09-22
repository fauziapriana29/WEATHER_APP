import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'weather-icons/css/weather-icons.css'
import 'weather-icons/css/weather-icons-wind.css'
import Input from './Components/Input/Input'
import Display from './Components/Display/Main-display/Main-display.jsx'
import Spinner from './Components/Spinner/Spinner.jsx'
import Footege from './Components/images/clouds.mp4'
import './App.css';

function App() {

  const [state, setState] = useState({
    city: '',
    description: '',
    temp: '',
    temp_max: '',
    temp_min: '',
    wind_speed: '',
    wind_deg: '',
    icons_id: '',
    longitude: '',
    latitude: ''
  })
  const [firstLoad, setFirstLoad] = useState(true)
  const [loading, setLoading] = useState(true)
  const apiKey = "284d0c8d3f216bf0622500d1663147e7"

  // https://tile.openweathermap.org/map/precipitation_new/3/-7.25/112.75.png?appid=284d0c8d3f216bf0622500d1663147e7


  const getApiWeathers = (values, e) => {
    if (firstLoad === true) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`).then((respone) => {
          const data = respone.data
          setState({
            city: data.name,
            description: data.weather[0].description,
            temp: data.main.temp,
            temp_max: data.main.temp_max,
            temp_min: data.main.temp_min,
            wind_speed: data.wind.speed,
            wind_deg: data.wind.deg,
            icons_id: data.weather[0].id,
            longitude: data.coord.lat,
            latitude: data.coord.lon
          })
          setFirstLoad(false)
          setLoading(false)
          console.log(respone.data)
        })
      })
    }
    else {
      const city = values.city
      console.log(city)
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then((respone) => {
        const data = respone.data
        setState({
          city: data.name,
            description: data.weather[0].description,
            temp: data.main.temp,
            temp_max: data.main.temp_max,
            temp_min: data.main.temp_min,
            wind_speed: data.wind.speed,
            wind_deg: data.wind.deg,
            icons_id: data.weather[0].id,
            longitude: data.coord.lat,
            latitude: data.coord.lon
        })
        setLoading(false)
      }).catch((error) => {
        alert('Cannot find the location')
      })
      e.target.reset()
    }
  }

  const icons = () => {
    const id = state.icons_id
    if (id >= 200 && id <= 232) {
      return('wi-day-thunderstorm')
    }
    else if (id >= 300 && id <= 321) {
      return('wi-day-sleet')
    }
    else if (id >= 500 && id <= 531) {
      return('wi-day-snow-thunderstorm')
    }
    else if (id >= 600 && id <= 622) {
      return('wi-day-snow')
  }
    else if (id >= 701 && id <= 781) {
      return('wi-day-fog')
    }
    else if (id == 800) {
      return('wi-day-sunny')
    }
    else if (id >= 801 && id <= 804) {
      return('wi-day-cloudy')
    }
  }
  console.log(state.longitude)

  useEffect(() => {
    getApiWeathers()
  }, [])

  const setDisplay = !loading ?  <Display state={state} icons={icons()}/> : <Spinner/> 
  
    return (
      <div>
        <video className="video" autoPlay loop muted>
          <source src={Footege} type="video/mp4"/>
        </video>
        <Input getweaters={getApiWeathers} />
        {setDisplay}
        {/* <Video/> */}
      </div>
    );

}

export default App
