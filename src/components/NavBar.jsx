import { useMode } from "../assets/globalState";
import PropTypes from 'prop-types';
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { motion } from "motion/react"

export default function NavBar({ passedmode }) {
    const [mode, setMode] = useMode();
    return (
        <div className={`${passedmode ? "light" : "dark"}`}>
            <div className="fixed dark:text-black gap-2 right-0 top-2">
                <div className="flex">
                    <motion.button
                        className="ml-2 cursor-pointer px-2 py-1 border-2 bg-black/50 dark:border-black border-black dark:bg-white rounded-full w-16"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 0.8}}
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