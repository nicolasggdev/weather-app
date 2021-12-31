import axios from 'axios';
import { useEffect, useState } from 'react'

const useRequest = () => {
    
    // Hooks
    const [data, setData] = useState({});
    const [isLocation, setIsLocation] = useState(false);
    const [degrees, setDegrees] = useState([null, "°C"]);
    const [search, setSearch] = useState (" ");
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
                setIsLocation(true);
                setDegrees([Math.round(temp_max - 273.15), "°C"]);
            })
            .catch(err => console.log(err))
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
        setIsLoading(true);
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
            setIsLoading(false);
            setDegrees([Math.round(temp_max - 273.15), "°C"]);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
            setSearch("It's necessary to write the place correctly");
        })
    };
    
    return {
        name, 
        country, 
        speed, 
        all,
        pressure, 
        weather, 
        icon,
        isLocation,
        degrees,
        handleMeasure,
        search,
        customPlace,
        isLoading
    };
};

export default useRequest;
