import { useState } from "react";
import PropTypes from 'prop-types';
import { motion } from "motion/react";

function Quiz({ passedmode }) {
  const questionsList = {
    1: "What is the standard markup language for creating web pages?",
    2: "Which language is used for styling web pages?",
    3: "Which of the following is a JavaScript framework?",
    4: "What does CSS stand for?",
    5: "Which HTML tag is used to define an internal style sheet?",
  };

  const ansList = {
    1: ["PHP", "HTML", "CSS", "JavaScript"],
    2: ["Python", "SQL", "CSS", "JavaScript"],
    3: ["Django", "Laravel", "React", "Flask"],
    4: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    5: ["<style>", "<script>", "<head>", "<link>"],
  };

  const rightAns = {
    1: "HTML",
    2: "CSS",
    3: "React",
    4: "Cascading Style Sheets",
    5: "<style>",
  };

  const [currentQues, setCurrentQues] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [result, setResult] = useState(true);
  const [score, setScore] = useState(0);

  const handleChange = () => {
    if (currentQues === 5) {
      setResult(false);
    } else {
      setCurrentQues(currentQues + 1);
      setIsActive(false);
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);
    }
  };

  const scoreUpdate = (ans) => {
    setSelectedAnswer(ans);
    if (ans === rightAns[currentQues]) {
      setScore(score + 1);
    } else {
      setShowCorrectAnswer(true);
    }
    setIsActive(true);
  };

  return (
    <div className={`${passedmode ? "dark bg-white" : "light bg-gray-900"}`}>
        <div className="flex justify-center items-center bg-transparent h-screen">
        {result ? (
          <div className="max-w-md p-4 bg-stone-100 dark:bg-gray-800 rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">{questionsList[currentQues]}</h1>
            <div className="space-y-4">
              {ansList[currentQues].map((ans, index) => (
                <button
                  key={index}
                  disabled={isActive}
                  onClick={() => scoreUpdate(ans)}
                  className={`w-full py-2 px-4 rounded-md transition-colors dark:text-white border-2 ${selectedAnswer === ans
                      ? ans === rightAns[currentQues]
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : showCorrectAnswer && ans === rightAns[currentQues]
                        ? "bg-green-500 text-green-700"
                        : "bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800"
                    }`}
                >
                  {ans}
                </button>
              ))}
            </div>
            <button
              className="w-full py-2 px-4 mt-4 rounded-md bg-blue-500 text-white hover:bg-blue-700"
              onClick={handleChange}
            >
              {currentQues === 5 ? "Submit" : "Next"}
            </button>
          </div>
        ) : (
          <motion.div className="max-w-md w-1/2 h-96 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:text-white flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
            <h3 className="text-xl font-bold mb-4">{score >= 3 ? "Congrats!" : "Too Bad!"}</h3>
            <h2 className="text-2xl font-bold mb-2">Your Score:</h2>
            <h1 className="text-4xl font-bold">{score} / 5</h1>
            <button
              className="w-full py-2 px-4 mt-4 rounded-md bg-blue-500 text-white hover:bg-blue-700"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Quiz;

Quiz.propTypes = {
  passedmode: PropTypes.bool.isRequired,
}
