import React from 'react';

const QuizLanding = ({ handleStart }) => {
    return (
        <>
            <div className="flex font-poppins items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 to-pink-200">
                <div className="bg-white bg-opacity-90 backdrop-blur-lg  shadow-lg p-8 max-w-lg w-full text-center">
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">🎉 Get Ready for the Ultimate Challenge: How Well Do You Know Suboor?</h1>
                    <p className="text-gray-600 mb-6">Let the Quiz Games Begin! 🎉</p>
                    <button onClick={handleStart} className="mt-4 w-full py-2 bg-pink-600 text-white rounded-lg hover:bg-blue-500 transition duration-200">Start</button>
                </div>
            </div>
        </>
    );
};

export default QuizLanding;
