import { Link } from "react-router"
import { motion } from "motion/react"

function ErrorPage({ passedmode }) {
    return (
        <div className={passedmode ? "light" : "dark"}>
            <div className="grid h-screen place-content-center bg-white px-4 dark:bg-gray-900">
                <div className="text-center">
                    <h1 className="text-9xl font-black text-gray-200 dark:text-gray-700">404</h1>

                    <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        Uh-oh!
                    </p>

                    <p className="mt-4 text-gray-500 dark:text-gray-400">We can&apos;t find that page.</p>

                    <a
                        href="#"
                        className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to={"/"}>
                                Go Back Home
                            </Link>
                        </motion.div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage