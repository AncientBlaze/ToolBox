import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BiSearch } from "react-icons/bi";

const api = {
    key: "cdc346c153f2ccb8d70233dadf603e67",
    base: "https://api.openweathermap.org/data/2.5/"
};

function Weather({ passedmode }) {
    const [state, setState] = useState("kolkata");
    const [weather, setWeather] = useState(null);
    const [adWeather, setAdWeather] = useState(null);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    const icon = {
        '50d' : 'https://cdn-icons-png.flaticon.com/128/18478/18478770.png',
        '01d' : 'https://cdn-icons-png.flaticon.com/128/3222/3222800.png',
        '02d' : 'https://cdn-icons-png.flaticon.com/128/13621/13621290.png',
        '03d' : 'https://cdn-icons-png.flaticon.com/128/13633/13633312.png',
        '04d' : 'https://cdn-icons-png.flaticon.com/128/7486/7486769.png',
        '09d' : 'https://cdn-icons-png.flaticon.com/128/6319/6319820.png',
        '10d' : 'https://cdn-icons-png.flaticon.com/128/5545/5545843.png',
        '11d' : 'https://cdn-icons-png.flaticon.com/128/2756/2756851.png',
        '13d' : 'https://cdn-icons-png.flaticon.com/128/4834/4834727.png',

        '50n' : 'https://cdn-icons-png.flaticon.com/128/2930/2930127.png',
        '01n' : 'https://cdn-icons-png.flaticon.com/128/2402/2402957.png',
        '02n' : 'https://cdn-icons-png.flaticon.com/128/3425/3425906.png',
        '03n' : 'https://cdn-icons-png.flaticon.com/128/15487/15487460.png',
        '04n' : 'https://cdn-icons-png.flaticon.com/128/7486/7486769.png',
        '09n' : 'https://cdn-icons-png.flaticon.com/128/11035/11035259.png',
        '10n' : 'https://cdn-icons-png.flaticon.com/128/5903/5903792.png',
        '11n' : 'https://cdn-icons-png.flaticon.com/128/2337/2337416.png',
        '13n' : 'https://cdn-icons-png.flaticon.com/128/6319/6319915.png',
    }

    useEffect(() => {
        searchWeather();
    }, []);

    useEffect(() => {
        if (lat && lon) {
            getAdvanceData();
        }
    }, [lat, lon]);

    async function searchWeather() {
        try {
            const response = await fetch(`${api.base}weather?q=${state}&units=metric&appid=${api.key}`);
            const data = await response.json();
            if (response.ok) {
                setWeather(data);
                setLat(data.coord.lat);
                setLon(data.coord.lon);
            } else {
                console.error(`Error: ${data.message}`);
                setWeather(null);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    async function getAdvanceData() {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`);
            const data = await response.json();
            if (response.ok) {
                setAdWeather(data);
            } else {
                console.error(`Error: ${data.message}`);
                setAdWeather(null);
            }
        } catch (error) {
            console.error("Error fetching advanced weather data:", error);
        }
    }

    return (
        <div className={`${passedmode ? "dark bg-white" : "light bg-gray-900"} h-auto flex justify-center items-center p-20`}>
            <div className="w-full h-2/3 border-2 border-blue-400 rounded-lg">
                {weather && adWeather ? (
                    <div className="w-full h-full flex flex-col justify-center items-center py-5">
                        <div className="w-2/3 h-auto flex justify-center gap-5 items-center px-10">
                            <input
                                placeholder="Enter City Name"
                                onChange={(e) => setState(e.target.value)}
                                className="w-2/3 h-10 rounded-lg border-2 border-blue-400 p-2 outline-none"
                                type="text"
                            />
                            <button
                                onClick={searchWeather}
                                className="w-fit h-10 bg-white rounded-lg border-2 border-blue-400 p-2 outline-none"
                            >
                                <BiSearch/>
                            </button>
                        </div>
                        <div className="w-full mt-10 flex flex-col items-center justify-center">
                            <img src={icon[weather.weather[0].icon]} alt="Weather Icon" className="mb-5" />
                            <p className="text-center text-5xl mb-5 font-bold dark:text-black transition-all duration-500 ease-in-out">
                                {weather.weather[0].description}
                            </p>
                            <p className="text-center text-3xl font-bold dark:text-black transition-all duration-500 ease-in-out">
                                {Math.floor(weather.main.temp)} °C
                            </p>
                            <p className="text-center text-3xl font-bold dark:text-black transition-all duration-500 ease-in-out">
                                Feels Like: {Math.floor(weather.main.feels_like)} °C
                            </p>
                            <div className="mt-10 flex flex-row justify-center items-center gap-10">
                                <p className="text-center text-3xl font-bold dark:text-black transition-all duration-500 ease-in-out">
                                    Max Temp: {Math.floor(weather.main.temp_max)} °C
                                </p>
                                <p className="text-center text-3xl font-bold dark:text-black transition-all duration-500 ease-in-out">
                                    Min Temp: {Math.floor(weather.main.temp_min)} °C
                                </p>
                            </div>
                            <p className="text-center text-3xl font-bold dark:text-black transition-all duration-500 ease-in-out">
                                Humidity: {weather.main.humidity}%
                            </p>
                            <p className="text-center text-3xl font-bold dark:text-black transition-all duration-500 ease-in-out">
                                Wind: {weather.wind.speed} km/h
                            </p>
                            <p className="mt-5 text-center text-3xl font-bold dark:text-black transition-all duration-500 ease-in-out">
                                Cloud Cover: {weather.clouds.all}%
                            </p>
                            <div className='w-full h-auto flex flex-row justify-between my-3'>
                                {adWeather.hourly.temperature_2m.map((item, index) => (
                                    (index % 3 === 0) && (index <= 23) ? ( // Check if index is in the desired sequence
                                        <div key={index} className="w-[14%] h-20 flex flex-col rounded-xl py-5 justify-between">
                                            <p className='text-white text-2xl text-center'>{item}°C</p> {/* Display the temperature */}
                                            <p className='text-xs w-full text-center text-white'>
                                                {new Date(adWeather.hourly.time[index]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p> {/* Display only the time */}
                                        </div>
                                    ) : null
                                ))}
                            </div>
                            <div className='w-full h-auto flex flex-row justify-between px-10 my-5'>
                            {adWeather.hourly.temperature_2m.map((item, index) => (
                                (index % 24 === 12) && (index <= 156) ? (
                                    <div key={index} className="group w-[14%] h-[200px] flex flex-col bg-black rounded-xl py-5 justify-between hover:bg-white transition-[0.3s] hover:shadow-md hover:shadow-white">
                                        <p className="text-white group-hover:text-black text-2xl text-center">{item}°C</p> {/* Temperature */}
                                        <img src="https://img.freepik.com/free-vector/sun-flames-style-flat-colours_78370-6404.jpg?ga=GA1.1.162254289.1730966228&semt=ais_incoming" className="h-1/3 object-contain" />
                                        <p className="text-2xl w-full text-center text-white group-hover:text-black">
                                            {new Date(adWeather.hourly.time[index]).toLocaleDateString()}
                                        </p>
                                    </div>
                                ) : null
                            ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-screen flex justify-center items-center">
                        <p className="text-3xl text-blue-400">Loading...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;

Weather.propTypes = {
    passedmode: PropTypes.bool
};