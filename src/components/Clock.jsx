import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Clock({ passedmode }) {
    const [time, setTime] = useState(new Intl.DateTimeFormat('en-US', { timeStyle: 'short', hour12: true }).format(new Date()));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Intl.DateTimeFormat('en-US', { timeStyle: 'short', hour12: true }).format(new Date()));
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={passedmode ? "light" : "dark"}>
        <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
            <div className='p-5 bg-black dark:bg-white transition-colors duration-500 ease-in-out shadow-xl'>
                <p className='font-mono text-white dark:text-black text-5xl border-2 dark:border-black px-20 py-10'>
                    {time.split(":")[0] < 10 ? "0" + time : time}
                </p>
            </div>
        </div>
        </div>
    );
}

Clock.propTypes = {
    passedmode: PropTypes.bool.isRequired,
};

export default Clock;
