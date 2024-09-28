'use client';
import React, { useEffect, useState } from 'react';
import QuizLanding from './QuizLanding';
import { hideLayouts } from '../UmamaSuboor';
import { QUESTIONS, QUIZ_SCREENS, generateAnswerText, sendEmail } from './constants';
import Questions from './Questions';
import QuizResult from './QuizResult';
import SpinnerLoader from '@/lib/loader';

const UmamaQuiz = () => {
  const [currScreen, setCurrScreen] = useState(QUIZ_SCREENS.LANDING);
  const [allAnswers, setAllAnswers] = useState();

  const init = () => {
   const allAns = localStorage.getItem('allAns');
   if(allAns) {
    setAllAnswers(JSON.parse(allAns));
    setCurrScreen(QUIZ_SCREENS.RESULT);
   }
  }

  const getAllAnswers = async(ans = []) => {
    const allAns = QUESTIONS.map((q, i) => {
      return {
        ...q,
        herAnswer: ans[i]
      }
    })
    setAllAnswers(allAns);
    localStorage.setItem('allAns', JSON.stringify(allAns))
    const answerStr = generateAnswerText(allAns);
    setCurrScreen(QUIZ_SCREENS.RESULT);
    await sendEmail('Her Answers',answerStr);
  }

  const handleStart = () => {
    setCurrScreen(QUIZ_SCREENS.QA)
  }

  const activeScreen = {
    [QUIZ_SCREENS.LANDING]: <QuizLanding handleStart={handleStart} />,
    [QUIZ_SCREENS.QA]: <Questions getAllAnswers={getAllAnswers} />,
    [QUIZ_SCREENS.RESULT]: <QuizResult allAnswers={allAnswers} />
  }

  useEffect(() => {
    hideLayouts();
    init();
}, []);

    return (
        <section className='font font-poppins'>
            {activeScreen[currScreen]}
        </section>
    );
};

export default UmamaQuiz;
