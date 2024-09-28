import React from 'react';

const TopPanel = () => {
    return (
        <div className="bg-white rounded-lg  shadow px-3 py-5 my-3">
            <h2 className="font-bold text-lg  font-cursive">Well Done! My Girl</h2>
            {/* <p className="text-md pt-3">There’s no right or wrong answer; I created this quiz to understand you better. ❤️</p> */}
        </div>
    );
};

const RestartBtn = ({ resetQuiz }) => {
    return (
        <div className="bg-white rounded-lg  shadow px-3 py-10 my-3 text-center">
            <button onClick={resetQuiz} className="w-[70%] mx-auto py-2 bg-pink-600 text-white rounded-lg hover:bg-blue-500 transition duration-200">
                Restart Quiz
            </button>
        </div>
    );
};

const AnswePanel = ({ allAnswers = [] }) => {
    const getAnswerText = (idx) => {
        if (allAnswers[idx] && allAnswers[idx].herAnswer) {
            return <span className="font-bold">{allAnswers[idx].herAnswer}</span>;
        }
    };

    const getLoylTxt = (txt) => {
        if (txt === 'Loyalty') return 'Loyal';
        if (txt === 'Beauty') return 'Beautiful but I care about Loyalty more';
        if (txt === 'Intelligence') return 'Intelligent but I care about Loyalty more';
        if (txt === 'Romance') return 'Romantic but I care about Loyalty more';
    };

    return (
        <div className="bg-white rounded-lg shadow px-3 py-5 my-3">
            <p className="text-md font-base">
                Yes, my favorite color is {getAnswerText(0)}. I love your {getAnswerText(1)} and I’m glad you see me as {getAnswerText(2)}. I knew you would know that I like to eat {getAnswerText(3)}.
                You also know my hobby, which is {getAnswerText(4)}. Indeed, we will go {getAnswerText(5)} together. Yes, I feel that {getAnswerText(6)} is a romantic season, and I can't wait to
                experience it with you. I believe we both like {getAnswerText(7)}. I know you are {getLoylTxt(getAnswerText(8))} and I feel good knowing that you trust me {getAnswerText(9)}. Yes, I
                will gift you {getAnswerText(12)}. I will be there for you {getAnswerText(13)} when you're not in a good mood, and whenever we fight, I will {getAnswerText(15)}. I will always{' '}
                {getAnswerText(16)}. I will take you to {getAnswerText(26)} and we will watch {getAnswerText(27)} together.
            </p>
        </div>
    );
};
const QuizResult = ({ allAnswers = [], resetQuiz }) => {
    const renderPanels = () => {
        return allAnswers.map((ans, idx) => {
            return <Panel idx={idx} ans={ans} />;
        });
    };
    return (
        <>
            <style jsx global>{`
                .font-cursive {
                    font-family: 'Playwrite CU' !important;
                }
            `}</style>
            <div className="bg-pink-500  p-2">
                <TopPanel />
                <AnswePanel allAnswers={allAnswers} />
                {renderPanels()}
                <RestartBtn resetQuiz={resetQuiz} />
            </div>
        </>
    );
};

const Panel = ({ idx, ans }) => {
    return (
        <div className="bg-white rounded-lg shadow px-3 my-3" key={`panel-${idx}`}>
            <div className="border-b py-2 flex gap-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow-400">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                    />
                </svg>
                {ans.question}
            </div>
            <div className="py-2 flex gap-2 bg-green-100 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-pink-400">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                </svg>
                {ans.herAnswer}
            </div>
        </div>
    );
};

export default QuizResult;
