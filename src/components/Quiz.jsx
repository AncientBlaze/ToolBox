import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function Quiz({ passedmode }) {
    const [details, setDetails] = useState(null);
    const [counter, setCounter] = useState(0);
    const [score, setScore] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://the-trivia-api.com/v2/questions",
            );
            const data = await response.json();
            setDetails(data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const checkAnsAndUpdate = () => {
        setIsActive(false);
        setSelectedAnswer(null); // Reset the selected answer for the next question
        if (counter < details.length - 1) {
            setCounter(counter + 1);
        } else {
            setShowResult(true);
        }
    };

    const checkAnswer = (ans) => {
        if (!isActive) {
            setIsActive(true);
            setSelectedAnswer(ans); // Track the selected answer
            if (ans === details[counter].correctAnswer) {
                setScore(score + 1);
            }
        }
    };

    return (
        <div
            className={`p-16 ${passedmode ? "bg-white" : "bg-gray-900"} h-auto`}
        >
            {details && details.length > 0 ? (
                <div
                    className={`w-full h-auto py-20 ${
                        passedmode ? "bg-white" : "bg-gray-900"
                    } flex justify-center items-start border-2 border-blue-400 rounded-2xl`}
                >
                    {showResult ? (
                        <div className="text-center">
                            <p
                                className={`text-4xl font-bold mb-4 ${
                                    passedmode ? "text-black" : "text-white"
                                }`}
                            >
                                Result: {score} / {details.length}
                            </p>
                            <p
                                className={`text-2xl ${
                                    passedmode
                                        ? "text-gray-800"
                                        : "text-gray-300"
                                }`}
                            >
                                {score > details.length / 2
                                    ? "Well done!"
                                    : "Better luck next time!"}
                            </p>
                        </div>
                    ) : (
                        <div className="w-3/4 h-auto flex flex-col">
                            <p
                                className={`text-3xl ${
                                    passedmode ? "text-black" : "text-white"
                                } mb-10`}
                            >
                                <span className="text-blue-400">
                                    {counter + 1} .{" "}
                                </span>
                                {details[counter].question.text}
                            </p>
                            <div className="w-full h-auto flex flex-col gap-5 mb-10">
                                {details[counter].incorrectAnswers
                                    .concat(details[counter].correctAnswer)
                                    .sort()
                                    .map((answer, index) => (
                                        <button
                                            disabled={isActive}
                                            onClick={() => checkAnswer(answer)}
                                            className={`w-full h-auto px-5 py-2 text-start border border-blue-400 rounded-2xl text-lg transition-all duration-500 ease-in-out hover:shadow-lg hover:scale-105 ${
                                                isActive
                                                    ? details[counter]
                                                          .correctAnswer ===
                                                      answer
                                                        ? "bg-green-400 text-white"
                                                        : selectedAnswer ===
                                                          answer
                                                        ? "bg-red-400 text-white"
                                                        : "bg-white"
                                                    : passedmode
                                                    ? "bg-transparent text-black"
                                                    : "bg-transparent text-white"
                                            }`}
                                            key={index}
                                        >
                                            {answer}
                                        </button>
                                    ))}
                            </div>
                            <button
                                className={`w-full h-auto px-5 py-2 rounded-lg font-medium ${
                                    passedmode
                                        ? "text-white bg-black"
                                        : "text-black bg-white"
                                }`}
                                onClick={checkAnsAndUpdate}
                            >
                                {counter < details.length - 1
                                    ? "Next"
                                    : "Submit"}
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className={`w-full h-screen ${
                        passedmode ? "bg-white" : "bg-gray-900"
                    } flex justify-center items-center`}
                >
                    <p className="text-4xl font-medium text-red-400">
                        Loading...
                    </p>
                </div>
            )}
        </div>
    );
}

export default Quiz;
