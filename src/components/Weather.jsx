import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react"
import PropTypes from 'prop-types';


const api = {
    key: "88eaf8a7cf5d888c91e6d991d4d71046",
    base: "https://api.openweathermap.org/data/2.5/"
}

function Weather({ passedmode }) {
    const [state, setstate] = useState("");
    const [weather, setWeather] = useState({});
    const cityName = useRef(null);
    const [mode, setMode] = useState(passedmode);

    useEffect(() => {
        setMode(passedmode);
    }, [mode, setMode, passedmode]);

    async function searchWeather() {
        await fetch(`${api.base}weather?q=${state}&units=metric&appid=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                cityName.current = state;
            });
        setstate("");
    }
    return (
        <div className={`${passedmode ? "dark bg-white" : "light bg-gray-900"}`}>
            <div className="flex justify-center items-center bg-transparent h-screen">
                <div className="bg-white dark:bg-[#1F2937] shadow-lg p-2 rounded-2xl w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-4 text-center flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
                    <header className="py-2">
                        <h1 className="text-sm font-bold transition-all duration-500 ease-in-out dark:text-white">Weather App</h1>
                    </header>
                    <input type="text" onChange={(e) => setstate(e.target.value)} value={state} className="border-2 border-black p-1 transition-all duration-500 ease-in-out w-full max-w-xs dark:text-white dark:bg-[#1F2937] rounded-full dark:border-white" />
                    <button onClick={searchWeather} className="border-2 border-black rounded-sm p-1 mt-2 transition-all duration-500 ease-in-out hover:shadow-lg hover:scale-105 dark:border-white dark:bg-white dark:text-black">Get Weather</button>
                    <motion.div className="flex justify-center items-center w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: "easeInOut" }}>
                        {cityName.current && (
                            <motion.div className="mt-5 backdrop-filter backdrop-blur-lg border-2 bg-white dark:bg-gray-800/30 rounded-2xl w-full max-w-md h-auto p-6 shadow-2xl flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
                                <h2 className="text-lg lg:text-xl font-bold dark:text-white transition-all duration-500 ease-in-out">{String(cityName.current).toUpperCase()}</h2>
                                {weather?.cod === "404" ? (
                                    <motion.p className="lg:text-base text-sm text-red-600 dark:text-red-400 transition-all duration-500 ease-in-out">City not found</motion.p>
                                ) : (
                                    <div className="flex flex-col items-center space-y-4">
                                        <p className="text-2xl lg:text-3xl font-bold dark:text-white transition-all duration-500 ease-in-out">{weather?.main?.temp}°C</p>
                                        <img src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@4x.png`} alt="weather icon" className="w-20 h-20 transition-all duration-500 ease-in-out" />
                                        <div className="flex gap-4 text-center">
                                            <p className="text-sm lg:text-base dark:text-white transition-all duration-500 ease-in-out">Humidity {weather?.main?.humidity}%</p>
                                            <p className="text-sm lg:text-base dark:text-white transition-all duration-500 ease-in-out">Wind {weather?.wind?.speed} m/s</p>
                                            <p className="text-sm lg:text-base dark:text-white transition-all duration-500 ease-in-out">Clouds {weather?.clouds?.all}%</p>
                                            <p className="text-sm lg:text-base dark:text-white transition-all duration-500 ease-in-out">Description: {weather?.weather?.[0]?.description}</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Weather

Weather.propTypes = {
    passedmode: PropTypes.bool
}

