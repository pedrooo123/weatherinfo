'use client'
import { useState } from "react";
import Form from "./components/Form";
import WeatherData from "./components/WeatherData";

export default function Home() {
  const [weatherData, setWeatherData] = useState([null, null]);

  // weatherData tömb újra definiálása, valamely form elküldése után. (Az időjárási adatok megjelenítéshez a megadott koordinátákhoz) 
  const handleData = (id, data) => {
    const newData = [...weatherData];
    newData[id] = data;
    setWeatherData(newData);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Form id={0} onGetData={handleData} />
        {weatherData[0] && <WeatherData key={0} data={weatherData[0]} id={0} />}
      </div>
      <div>
        <Form id={1} onGetData={handleData} />
        {weatherData[1] && <WeatherData key={1} data={weatherData[1]} id={1} />}
      </div>
    </main>
  );
}
