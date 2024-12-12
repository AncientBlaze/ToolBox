import { useMode } from "../assets/globalState";
import PropTypes from 'prop-types';
import { NavLink } from "react-router";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { motion } from "motion/react"

export default function NavBar({ passedmode }) {
    const [mode, setMode] = useMode();
    return (
        <div className={`${passedmode ? "light" : "dark"}`}>
            <div className="flex justify-around items-center p-2 bg-white dark:bg-gray-800 dark:text-white gap-2">
                <NavLink to="/">
                    <h1 className="text-2xl font-bold">Weather App</h1>
                </NavLink>
                <NavLink to="/quiz">
                    <h1 className="text-2xl font-bold">Quiz App</h1>
                </NavLink>
                <NavLink to="/calculator">
                    <h1 className="text-2xl font-bold">Calculator App</h1>
                </NavLink>
                <div className="flex justify-center items-center">
                    <motion.button
                        className="ml-2 cursor-pointer px-2 py-1 border-2 bg-black/50 dark:border-white border-black dark:bg-white/75 rounded-full w-16"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.85 }}
                        transition={{ type: "spring", stiffness: 100, damping: 17 }}
                        onClick={() => setMode(!mode)}
                    >
                        <motion.div
                            initial={{ x: 0 }}
                            animate={{
                                x: mode ? 0 : 20,
                                transition: { duration: 0.5, ease: "easeInOut" },
                            }}
                            whileTap={{ scale: 0.8 }}
                        >
                            <DarkModeSwitch
                                sunColor="yellow"
                                moonColor="white"
                                onDrag={() => {
                                    setMode(!mode);
                                }}
                                checked={mode}
                                size={24}
                                className="text-2xl"
                            />
                        </motion.div>
                    </motion.button>
                </div>
            </div>
        </div >
    );
}



NavBar.propTypes = {
    passedmode: PropTypes.bool.isRequired,
};