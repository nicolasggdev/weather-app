import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Styles
import "./Card.styles.css";

// Components
import Icon from "../Icon/Icon.jsx";

const Card = () => {

    // Hooks
    const [data, setData] = useState({});
    const [isLocation, setIsLocation] = useState(false);
    const [degrees, setDegrees] = useState([null, "°C"]);
    const [search, setSearch] = useState (" ");
    // const [isLoading, setIsLoading] = useState(true) // PENDIENTE ELABORAR LOADER

    // PENDIENTE TRASLADAR LOGICA AL CUSTOMHOOK
    useEffect(() => {
        const success = position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const key = "a2deae3d58c54683b6b7aca1419f1278";
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
            .then(res => {
                const {data: {name, sys: {country}, wind:{speed}, clouds: {all}, main: {temp_max, pressure} , weather}} = res
                setData({
                    name: name,
                    country: country,
                    speed: speed,
                    all: all,
                    temp: Math.round(temp_max - 273.15), // Se usó temp_max porque la propiedad temp no daba con exactitud el clima actual y se convirtio de Kelvin a Celsius (se comparó con diversas apps del clima
                    pressure: pressure,
                    weather: weather[0].description,
                    icon: weather[0].icon,
                });
                setIsLocation(true);
                setDegrees([Math.round(temp_max - 273.15), "°C"]);
            })
            .catch(err => console.log(err));
        };
        const error = () => setIsLocation(false);
        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    // Variables
    const {name, country, speed, all, temp, pressure, weather, icon} = data;

    // Functions
    const handleMeasure = () => {
        let value = 0;
        if(degrees[1] === "°C"){
            value = Math.round((temp * 1.8) + 32);
            setDegrees([value, "°F"]);
        } else{
            value = temp;
            setDegrees([value, "°C"]);
        };
    };

    const customPlace = e => {
        e.preventDefault();
        const {target: {form}} = e;
        let place = form[0].value;
        const key = "a2deae3d58c54683b6b7aca1419f1278";
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${key}`)
        .then(res => {
            const {data: {name, sys: {country}, wind:{speed}, clouds: {all}, main: {temp_max, pressure} , weather}} = res
            setData({
                name: name,
                country: country,
                speed: speed,
                all: all,
                temp: Math.round(temp_max - 273.15), // Se usó temp_max porque la propiedad temp no daba con exactitud el clima actual y se convirtio de Kelvin a Celsius (se comparó con diversas apps del clima
                pressure: pressure,
                weather: weather[0].description,
                icon: weather[0].icon,
            });
            setDegrees([Math.round(temp_max - 273.15), "°C"]);
        })
        .catch(err => {
            console.log(err);
            setSearch("It's necessary to write the place correctly")
        })
    };

    return (
        <div className='card'>
            <h1>Weather App</h1>
            {isLocation ? (
                <h2>{name}, {country}</h2>
                ) : ( <h2>Can't access your location</h2>
            )}
            <div className='info'>
                <div className='info_icon'>
                    <Icon icon={icon}/>
                    <p>
                        {degrees[0]} {degrees[1]}
                    </p>
                    <button onClick={handleMeasure}>
                        <b>Degrees °F/°C</b>
                    </button>
                </div>
                <div className='info_data'>
                    <p>
                        <b>Weather:</b> {weather}
                    </p>
                    <p>
                        <b>Wind speed:</b> {speed} m/s
                    </p>
                    <p>
                        <b>Clouds:</b> {all} %
                    </p>
                    <p>
                        <b>Pressure: </b>{pressure} hPa
                    </p>
                </div>
            </div>    
            <div className='search'>
                <form method="get">
                    {search === " " ? (
                        <input className='search_text' type="text" placeholder="Search your city" required/> 
                        ) : 
                        <input className='search_text' type="text" placeholder="Search your city" title={search} required/>
                    }
                    <input className='search_submit' type="submit" value="Search" onClick={(e) => customPlace(e)}/>
                </form>
            </div>    
        </div>
    );
};

export default Card;
