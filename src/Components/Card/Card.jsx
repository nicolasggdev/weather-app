import React from "react";

// Styles
import "./Card.styles.css";

// Components
import Icon from "../Icon/Icon.jsx";
import Loader from "../Loader/Loader.jsx";

// CustomHook
import useRequest from "../CustomHooks/useRequest";

const Card = () => {
  // Hooks
  const {
    name,
    country,
    speed,
    all,
    pressure,
    weather,
    isLocation,
    degrees,
    icon,
    handleMeasure,
    search,
    customPlace,
    isLoading,
  } = useRequest();

  return (
    <div className="card">
      <h1>Weather App</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isLocation ? (
            <h2>
              {name}, {country}
            </h2>
          ) : (
            <h2>Can't access your location</h2>
          )}
          <div className="info">
            <div className="info_icon">
              <Icon icon={icon} />
              <p>
                {degrees[0]} {degrees[1]}
              </p>
              <button onClick={handleMeasure}>
                <b>Degrees °F/°C</b>
              </button>
            </div>
            <div className="info_data">
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
                <b>Pressure: </b>
                {pressure} hPa
              </p>
            </div>
          </div>
          <div className="search">
            <form method="get">
              {search === " " ? (
                <input
                  className="search_text"
                  type="text"
                  placeholder="Search your city"
                  required
                />
              ) : (
                <input
                  className="search_text"
                  type="text"
                  placeholder="Search your city"
                  title={search}
                  required
                />
              )}
              <input
                className="search_submit"
                type="submit"
                value="Search"
                onClick={(e) => customPlace(e)}
              />
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
