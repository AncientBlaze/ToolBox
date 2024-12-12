import { useState } from "react";
import PropTypes from 'prop-types';
import { motion } from "motion/react"

export default function Calculator({ passedmode }) {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");

    const handleClick = (value) => {
        setInput((prevInput) => prevInput + value);
    };

    const handleClear = () => {
        setInput("");
        setResult("");
    };

    const handleCalculate = () => {
        const evaluatedResult = eval(input);
        if (evaluatedResult === Infinity || evaluatedResult === -Infinity) {
            setInput("");
            setResult("Error: Result is Infinity");
        } else {
            setInput(evaluatedResult.toString());
            setResult("");
        }
    };

    return (
        <div className={passedmode ? "light" : "dark"}>
            <div className={`flex justify-center items-center bg-transparent h-[70vh] font-bold *:font-mono`}>
                <div className="bg-white/40 dark:bg-gray-800 shadow-md rounded-lg p-6 w-80">
                    <div className="mb-4 text-right">
                        <div className="flex border border-spacing-40 border-black focus:outline-none rounded-xl px-2 py-2">
                            <input
                                type="text"
                                value={input}
                                disabled
                                className="w-full bg-transparent text-black dark:text-white text-xl"
                            />
                            {input &&
                                <button
                                    onClick={handleClear}
                                    className="col-span-4 bg-red-500 text-white h-auto w-auto px-2 rounded-lg hover:bg-gray-950 transition dark:bg-red-500 dark:text-white font-bold dark:hover:bg-red-600"
                                >
                                    C
                                </button>
                            }
                        </div>
                        <div className="text-lg text-gray-500 dark:text-gray-400 flex justify-between items-center">
                            <p className="font-bold">{result && "Ans"}</p>
                            <p className="font-semibold">{result}</p>
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.5 }}
                        className="grid grid-cols-4 gap-2"
                    >
                        {["1", "2", "3", "/", "4", "5", "6", "*", "7", "8", "8", "-", ".", "0", "=", "+"].map((value) => (
                            <motion.button
                                key={value}
                                onClick={() => (value === "=" ? handleCalculate() : handleClick(value))}
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ ease: "easeInOut", duration: 0.2 }}
                                className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                {value}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

Calculator.propTypes = {
    passedmode: PropTypes.bool.isRequired,
}