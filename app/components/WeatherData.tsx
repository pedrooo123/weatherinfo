import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThermometerHalf, faCloud, faWind, faWater } from "@fortawesome/free-solid-svg-icons";

// Az szerver oldalról visszakapott időjárási adatok megjelenítése
export default function WeatherData({ data, id, onGetData }) {
    const { main, wind, weather, name } = data || {};

    const [iconUrl, setIconUrl] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("");

    // Az időjáráshoz tartozó icon képének lekérése
    useEffect(() => {
        const iconCode = weather[0].icon;
        const url = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        setIconUrl(url);

        // Háttérkép beállítása
        const conditionsForRainImage = ["Clear", "Clouds", "Drizzle", "Rain", "Snow", "Thunderstorm"];
        setBackgroundImage(conditionsForRainImage.includes(weather[0].main) ? `url('./${weather[0].main}.jpg')` : "url('./unknown-weather.jpg')");
    }, [weather]);

    // A szélsebesség átváltása m/s-ről km/h-ra
    function convertWindSpeed(speedInMs) {
        const kmPerHour = speedInMs * 3.6;
        return kmPerHour.toFixed(2);
    }

    // Adatok törlése
    const handleCancelData = () => {
        onGetData(id, null);
    }

    return (
        <div className="weatherdata-container container p-4 shadow-md" style={{ backgroundImage: backgroundImage, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <div className="overlay"></div>
            <div className="weatherdata-content">
                <h1 className="text-center text-2xl font-semibold mb-4">{name}</h1>
                <div className="grid sm:grid-cols-2 gap-4">
                    {/* Hőmérséklet */}
                    <div className="flex justify-center">
                        <FontAwesomeIcon icon={faThermometerHalf} className="mr-2" size="lg"/>
                        {main.temp} °C
                    </div>
                    {/* Időjárás */}
                    <div className="flex justify-center">
                        {weather.map((condition) => (
                            <span>
                                <img src={iconUrl} alt="weather icon" className="inline-block w-6 h-6 mr-2" />
                                {condition.main}
                            </span>
                        ))}
                    </div>
                    {/* Páratartalom */}
                    <div className="flex justify-center">
                        <FontAwesomeIcon icon={faWater} className="mr-2" size="lg"/>
                        {main.humidity}%
                    </div>
                    {/* Szélsebesség */}
                    <div className="flex justify-center">
                        <FontAwesomeIcon icon={faWind} className="mr-2" size="lg"/>
                        {convertWindSpeed(wind.speed)} km/h
                    </div>
                </div>
                {/* Adatok törlése */}
                <div className="flex justify-center mt-6" >
                    <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={() => handleCancelData(id)}
                    >
                    Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}