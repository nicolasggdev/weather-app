import React from 'react';

// Styles
import "./Icon.styles.css";

const Icon = ({icon}) => {

    const img = () => {
        if(icon === "01d"){
            return "fas fa-sun";
        } else if(icon === "01n"){
            return "fas fa-moon";
        } else if (icon === "02d"){
            return "fas fa-cloud-sun";
        } else if(icon === "02n"){
            return "fas fa-cloud-moon";
        } else if(icon === "03d" || "03n"){
            return "fas fa-cloud";
        } else if(icon === "04d" || "04n"){
            return "fas fa-cloud";
        } else if(icon === "09d" || "09n"){
            return "fas fa-cloud-showers-heavy";
        } else if(icon === "10d"){
            return "fas fa-cloud-sun-rain";
        } else if(icon === "10n"){
            return "fas fa-cloud-moon-rain";
        } else if(icon === "11d" || "11n"){
            return "fas fa-poo-storm";
        } else if(icon === "13d" || "13n"){
            return "far fa-snowflake";
        } else if(icon === "50d" || "50n"){
            return "fas fa-smog";
        }
    };

    return (
        <div className='container_icon'>
            <i className={img()}></i>
        </div>
    )
}

export default Icon
