import React from 'react'
import './Main-display.css'

const Display = (props) => {

    const { state, icons } = props 
    
    const temp = Math.floor(state.temp - 273.15)
    const maxTemp = Math.floor(state.temp_max - 273.15)
    const minTemp = Math.floor(state.temp_min - 273.15)

    const windDeg = () => {
        if (state.wind_deg > 180) {
            return state.wind_deg - 180
        } else {
            return state.wind_deg + 180
        }
    }

    return (
        <div className="main-container">
            <div className="cont-2"><h1 className="main-temp">{temp}&deg;</h1></div>
            <div className="cont-3">
                <h1 className="city-title">{state.city}</h1>
                <p>Latitude: {state.latitude}</p>
                <p>Longtitude: {state.longitude}</p>
            </div>
            <div className="cont-4">
                <i className={`wi ${icons} display-1`} />
                <h2 className="w-desc">{state.description}</h2>
            </div>
            <div className="main-cont-btm">
                <div className="cont-5"><h4>Max Temp:</h4><h2 className="btm-indicator">{maxTemp}&deg;C</h2></div>
                <div className="cont-6"><h4>Min Temp:</h4><h2 className="btm-indicator">{minTemp}&deg;C</h2></div>
                <div className="cont-7"><h4>Wind Speed:</h4><h2 className="btm-indicator">{state.wind_speed} Kn</h2></div>
                <div className="cont-8">
                    <h4>Wind Deg:</h4>
                    <i className={`wi wi-wind from-${windDeg()}-deg towards-sse display-1`} />
                    <h3>{state.wind_deg}</h3>
                </div>
            </div>  
        </div>
    )
}
export default Display