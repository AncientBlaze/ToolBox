import { NavLink } from "react-router"
import { TiWeatherCloudy } from "react-icons/ti"
import { FaCalculator, FaClock } from "react-icons/fa6"
import PropTypes from 'prop-types';
import { MdOutlineQuiz } from "react-icons/md";
import { CgNotes } from "react-icons/cg";

function Footer({ passedmode }) {
    return (
        <div className={`${passedmode ? "light" : "dark"}`}>
            <div
                className="md:w-[50%] w-full mx-auto drop-shadow-2xl flex items-center justify-around bg-white dark:bg-[#1F2937] rounded py-2 px-4 mb-5 fixed bottom-0 left-[50%] translate-x-[-50%] z-50 dark:text-white"
            >
                <NavLink to="/" className={({ isActive }) => (isActive ? "text-blue-600 dark:text-blue-400" : "")}>
                    <div className="group relative px-3 cursor-pointer">
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-blue-50 dark:hover:bg-gray-500 hover:text-blue-600 transition-colors duration-300 dark"
                        >
                            <TiWeatherCloudy size={20} />

                        </div>
                        <span
                            className="absolute -top-12 left-[50%] -translate-x-[50%] z-20 origin-bottom scale-0 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium shadow-lg transition-all duration-300 ease-in-out group-hover:scale-100 dark:text-white dark:bg-gray-800"
                        >
                            Weather
                        </span>
                    </div>
                </NavLink>
                <NavLink to="/clock" className={({ isActive }) => (isActive ? "text-blue-600 dark:text-blue-400" : "")}>
                    <div className="group relative px-3 cursor-pointer">
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-blue-50 dark:hover:bg-gray-500 hover:text-blue-600 hover:dark:text-white transition-colors duration-300 dark"
                        >
                            <FaClock size={20} />
                        </div>
                        <span
                            className="absolute -top-12 left-[50%] -translate-x-[50%] z-20 origin-bottom scale-0 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium shadow-lg transition-all duration-300 ease-in-out group-hover:scale-100 dark:text-white dark:bg-gray-800"
                        >
                            Clock
                        </span>
                    </div>
                </NavLink>
                <NavLink to="/quiz" className={({ isActive }) => (isActive ? "text-blue-600 dark:text-blue-400" : "")}>
                    <div className="group relative px-3 cursor-pointer">
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-blue-50 dark:hover:bg-gray-500 hover:text-blue-600 transition-colors duration-300 dark"
                        >
                            <MdOutlineQuiz size={20} />
                        </div>
                        <span
                            className="absolute -top-12 left-[50%] -translate-x-[50%] z-20 origin-bottom scale-0 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium shadow-lg transition-all duration-300 ease-in-out group-hover:scale-100 dark:text-white dark:bg-gray-800"
                        >
                            Quiz
                        </span>
                    </div>
                </NavLink>
                <NavLink to="/todo" className={({ isActive }) => (isActive ? "text-blue-600 dark:text-blue-400" : "")}>
                    <div className="group relative px-3 cursor-pointer">
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-blue-50 dark:hover:bg-gray-500 hover:text-blue-600 transition-colors duration-300 dark"
                        >
                            <CgNotes size={20} />
                        </div>
                        <span
                            className="absolute -top-12 left-[50%] -translate-x-[50%] z-20 origin-bottom scale-0 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium shadow-lg transition-all duration-300 ease-in-out group-hover:scale-100 dark:text-white dark:bg-gray-800"
                        >
                            Todo
                        </span>
                    </div>
                </NavLink>
                <NavLink to="/calculator" className={({ isActive }) => (isActive ? "text-blue-600 dark:text-blue-400" : "")}>
                    <div className="group relative px-3 cursor-pointer">
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-blue-50 dark:hover:bg-gray-500 hover:text-blue-600 hover:dark:text-white transition-colors duration-300 dark"
                        >
                            <FaCalculator size={20} />
                        </div>
                        <span
                            className="absolute -top-12 left-[50%] -translate-x-[50%] z-20 origin-bottom scale-0 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium shadow-lg transition-all duration-300 ease-in-out group-hover:scale-100 dark:text-white dark:bg-gray-800"
                        >
                            Calculator
                        </span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Footer

Footer.propTypes = {
    passedmode: PropTypes.bool.isRequired,
}