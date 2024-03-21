'use client'
import { useState } from "react";
import Form from "./components/Form";
import WeatherData from "./components/WeatherData";;

export default function Home() {
  const [weatherData, setWeatherData] = useState([null, null]);

  // weatherData tömb újra definiálása, valamely form elküldése után. (Az időjárási adatok megjelenítéshez a megadott koordinátákhoz) 
  const handleGetData = (id, data) => {
    const newData = [...weatherData];
    newData[id] = data;
    setWeatherData(newData);
  };

  return (
    <div className="min-h-screen">
    <div className="mt-12 text-center sm:p-12 px-12">
      <h1 className="page-title mb-5 text-2xl font-semibol">Weather Info App</h1>
      <div className="page-descriptipn">Enter the coordinates of two different cities to view and compare the current weather data side by side.</div>
    </div>
    <div className="flex items-center">
      <div className="grid sm:grid-cols-2 px-8 gap-10 mt-10 flex flex-grow">
        <div className="form-container w-full mb-8 sm:mb-0 md:p-12">
          {!weatherData[0] && <Form id={0} onGetData={handleGetData}/>}
          {weatherData[0] && <WeatherData key={0} data={weatherData[0]} id={0} onGetData={handleGetData}/>}
        </div>

        <div className="form-container w-full mb-8 sm:mb-0 md:p-12">
          {!weatherData[1] && <Form id={1} onGetData={handleGetData}/>}
          {weatherData[1] && <WeatherData key={1} data={weatherData[1]} id={1} onGetData={handleGetData}/>}
        </div>
      </div>
    </div>
    </div>
  );
}
