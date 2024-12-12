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
        <div className={passedmode ? "light" : "dark"}>
            <div className="flex justify-center items-center bg-transparent h-screen">
                <div className="bg-white dark:bg-[#1F2937] shadow-lg p-2 rounded-2xl w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-4 text-center flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
                    <header className="py-2">
                        <h1 className="text-sm font-bold transition-all duration-500 ease-in-out dark:text-white">Weather App</h1>
                    </header>
                    <input type="text" onChange={(e) => setstate(e.target.value)} value={state} className="border-2 border-black p-1 transition-all duration-500 ease-in-out w-full max-w-xs dark:text-white dark:bg-[#1F2937] rounded-full dark:border-white" />
                    <button onClick={searchWeather} className="border-2 border-black rounded-sm p-1 mt-2 transition-all duration-500 ease-in-out hover:animate-pulse hover:shadow-lg hover:scale-105 dark:border-white dark:bg-white dark:text-black">Get Weather</button>
                    <motion.div className="flex justify-center items-center w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: "easeInOut" }}>
                        {cityName.current && (
                            <motion.div className="mt-5 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl w-full max-w-md h-auto p-4 shadow-md flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
                                <h2 className="text-base lg:text-lg font-bold transition-all duration-500 ease-in-out">{String(cityName.current).toUpperCase()}</h2>
                                <p className="lg:text-base text-sm transition-all duration-500 ease-in-out">Temperature: {weather?.main?.temp}℃</p>
                                <img src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@4x.png`} alt="" className="w-10 h-10 transition-all duration-500 ease-in-out" />
                                <p className="lg:text-base text-sm transition-all duration-500 ease-in-out">Humidity: {weather?.main?.humidity}%</p>
                                <p className="lg:text-base text-sm transition-all duration-500 ease-in-out">Wind: {weather?.wind?.speed}m/s</p>
                                <p className="lg:text-base text-sm transition-all duration-500 ease-in-out">Clouds: {weather?.clouds?.all}%</p>
                                <p className="lg:text-base text-sm transition-all duration-500 ease-in-out">Description: {weather?.weather?.[0]?.description}</p>
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

