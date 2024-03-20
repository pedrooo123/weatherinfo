// Az szerver oldalról visszakapott időjárási adatok megjelenítése
export default function WeatherData({ data, id }) {
    const { main, wind, weather, name } = data || {};

    // A szélsebesség átváltása m/s-ről km/h-ra
    function convertWindSpeed(speedInMs) {
        const kmPerHour = speedInMs * 3.6;
        return kmPerHour.toFixed(2);
    }
  
    return (
        <div>
            <h2>{name} ({id})</h2>
            <p>Temperature: {main.temp} °C</p>
            <p>Humidity: {main.humidity}%</p>
            <p>Wind speed: {convertWindSpeed(wind.speed)} km/h</p>
            <ul>
                {weather.map((condition) => (
                <li key={condition.id}>{condition.main}</li>
                ))}
            </ul>
        </div>
    );
}