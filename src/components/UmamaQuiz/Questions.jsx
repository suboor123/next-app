import React, { useState } from 'react';
import { QUESTIONS } from './constants';

const Questions = ({ getAllAnswers }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [currAnswer, setCurrAnswer] = useState();
    const quiz = QUESTIONS[currentQuestion];
    const isFinalQuestion = currentQuestion === (QUESTIONS.length - 1);

    const handleSubmit = () => {
        if (!currAnswer) {
            alert('Please choose an option');
            return;
        }

        const allAns = [...answers, currAnswer];
        setAnswers(allAns);
        setCurrAnswer();

        if (isFinalQuestion) {
            getAllAnswers(allAns);
        } else {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-pink-300">
                <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-md p-6 max-w-md w-full">
                    <h2 className="text-xl font-semibold mb-4">{quiz.question}</h2>
                    <form>
                        <div className="flex flex-col space-y-3">
                            {quiz.options.map((o, idx) => (
                                <label key={`opt-${idx}`} onClick={() => setCurrAnswer(o)} className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-200">
                                    <input checked={currAnswer === o} type="radio" name="answer" defaultValue="paris" className="form-radio text-pink-600" required />
                                    <span className="ml-2">{o}</span>
                                </label>
                            ))}
                        </div>
                        <button type="button" onClick={handleSubmit} className="mt-4 w-full py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition duration-200">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Questions;
