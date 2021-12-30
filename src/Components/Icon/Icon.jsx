import React, { useEffect, useState } from 'react'

// Styles
import "./Icon.styles.css"

const Icon = ({icon}) => {

    // Hooks
    const [image, setImage] = useState("");

    useEffect(() => {
        img(icon)
    },[icon])

    
    // TENGO PROBLEMAS CON LA IMG PORQUE NO ESTA CAMBIANDO CORRECTAMENTE CON EL CLIMA
    const img = param => {
        if(param === "01d"){
            setImage("fas fa-sun")
        } else if(param === "01n"){
            setImage("fas fa-moon")
        } else if (param === "02d"){
            setImage("fas fa-cloud-sun")
        } else if(param === "02n"){
            setImage("fas fa-cloud-moon")
        } else if(param === "03d" || "03n"){
            setImage("fas fa-cloud")
        } else if(param === "04d" || "04n"){
            setImage("fas fa-cloud")
        } else if(param === "09d" || "09n"){
            setImage("fas fa-cloud-showers-heavy")
        } else if(param === "10d"){
            setImage("fas fa-cloud-sun-rain")
        } else if(param === "10n"){
            setImage("fas fa-cloud-moon-rain")
        } else if(param === "11d" || "11n"){
            setImage("fas fa-poo-storm")
        } else if(param === "13d" || "13n"){
            setImage("far fa-snowflake")
        } else if(param === "50d" || "50n"){
            setImage("fas fa-smog")
        }
    }

    return (
        <div className='container_icon'>
            <i className={image}></i>
        </div>
    )
}

export default Icon
