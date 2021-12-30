import axios from 'axios';
import React, { useEffect, useState } from 'react'

// Styles
import "./Card.styles.css";

// Components
import Icon from "../Icon/Icon.jsx"

const Card = () => {

    // Hooks
    const [data, setData] = useState({});
    const [isLocation, setIsLocation] = useState(false);
    const [degrees, setDegrees] = useState([0, "°C"]);
    const [temperature, setTemperature] = useState ()
    // const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const success = position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const key = "a2deae3d58c54683b6b7aca1419f1278";
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
            .then(res => {
                const {data: {name, sys: {country}, wind:{speed}, clouds: {all}, main: {temp_max, pressure} , weather}} = res
                setTemperature({
                    temp: Math.round(temp_max - 273.15) // Se usó temp_max porque la propiedad temp no daba con exactitud el clima actual y se convirtio de Kelvin a Celsius (se comparó con diversas apps del clima
                });
                setData({
                    name: name,
                    country: country,
                    speed: speed,
                    all: all,
                    // temp: Math.round(temp_max - 273.15), // Se usó temp_max porque la propiedad temp no daba con exactitud el clima actual y se convirtio de Kelvin a Celsius (se comparó con diversas apps del clima)
                    pressure: pressure,
                    weather: weather[0].description,
                    icon: weather[0].icon,
                });
                setIsLocation(true)
            })
            .catch(err => console.log(err))
        };
        const error = () => setIsLocation(false);
        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    // Variables
    const {name, country, speed, all, pressure, weather, icon} = data;

    // Functions
    const handleMeasure = () => {
        let value = 0;
        if(degrees[1] === "°F"){
            value = (temperature * 1.8) + 32;
            setDegrees([value, "°F"])
        } else{
            value = (temperature - 32) / 1.8;
            setDegrees([value, "°C"])
        }

        // const temp = 0;    
        // degrees[] === "°C" ? setDegrees("°F") : setDegrees("°C")
    }

    return (
        <div className='card'>
            <h1>Weather App</h1>
            {isLocation ? <h2>{name}, {country}</h2> : <h2>Can't access your location</h2>}
            <div className='info'>
                <div className='info_icon'>
                    <Icon icon={icon}/>
                    <p>{degrees[0]} {degrees[1]}</p>
                    <button onClick={handleMeasure}><b>Degrees °F/°C</b></button>
                </div>
                <div className='info_data'>
                    <p><b>Weather:</b> {weather}</p>
                    <p><b>Wind speed:</b> {speed} m/s</p>
                    <p><b>Clouds:</b> {all} %</p>
                    <p><b>Pressure: </b>{pressure} hPa</p>
                </div>
            </div>    
            <div className='search'>
                <form>
                    <input type="text" placeholder="Search your city"/>
                    <input type="submit" /> {/* PREVENT DEFAULT */}
                </form>
            </div>    
        </div>
    );
};

export default Card;
