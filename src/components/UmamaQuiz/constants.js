export const QUESTIONS = [
    {
        index: 0,
        question: 'What is Suboor’s favorite color?',
        options: ['Black', 'White', 'Purple', 'Green'],
        answer: 0,
    },
    {
        index: 1,
        question: 'What does Suboor like most about Umama?',
        options: ['Cheeks', 'Smile', 'Nose', 'Ears'],
        answer: 1,
    },
    {
        index: 2,
        question: 'Is Suboor a good husband?',
        options: ['So far, so good', 'Normal like others', 'The best', 'Weird'],
        answer: 3,
    },
    {
        index: 3,
        question: 'What is Suboor’s favorite food?',
        options: ['Pizza', 'Biryani', 'Pasta', 'Sushi'],
        answer: 1,
    },
    {
        index: 4,
        question: 'What is Suboor’s favorite hobby?',
        options: ['Reading', 'Traveling', 'Gaming', 'Cooking'],
        answer: 3,
    },
    {
        index: 5,
        question: 'What is Suboor’s dream vacation destination?',
        options: ['Bali', 'Paris', 'Tokyo', 'New York'],
        answer: 1,
    },
    {
        index: 6,
        question: 'What is Suboor’s favorite season?',
        options: ['Spring', 'Summer', 'Autumn', 'Winter'],
        answer: 3,
    },
    {
        index: 7,
        question: 'What animal does Suboor like the most?',
        options: ['Dogs', 'Cats', 'Birds', 'Fish'],
        answer: 1,
    },
    {
        index: 8,
        question: 'What does Suboor care about the most?',
        options: ['Beauty', 'Loyalty', 'Intelligence', 'Romance'],
        answer: 1,
    },
    {
        index: 9,
        question: 'Do you trust Suboor?',
        options: ['Completely', 'Kind of', 'Nope', 'Blindly'],
        answer: 0,
    },
    {
        index: 10,
        question: 'Suboor’s favourite actor',
        options: ['Salman Khan', 'Aamir Khan', 'Shahrukh Khan', 'None of these'],
        answer: 2,
    },
    {
        index: 11,
        question: 'Are you happy with him?',
        options: ['So much', 'The best thing that can ever happen', 'Not much', 'Sometimes'],
        answer: 1,
    },
    {
        index: 12,
        question: 'What is Suboor’s go-to gift for you?',
        options: ['Jewelry', 'Flowers', 'Books', 'Chocolate'],
        answer: 1,
    },
    {
        index: 13,
        question: 'How does Suboor make you feel better when you’re not in a good mood?',
        options: ['Talking it out', 'Ignoring it', 'Making a joke', 'Taking a break'],
        answer: 0,
    },
    {
        index: 14,
        question: 'What would be the best gift you want from Suboor?',
        options: ['A surprise trip', 'A special piece of jewelry', 'A heartfelt letter', 'Something handmade'],
        answer: 1,
    },
    {
        index: 15,
        question: 'If you two have a fight, what do you want Suboor to do to make you feel better?',
        options: ['Apologize right away', 'Give you space', 'Take you out for a meal', 'Send a sweet message'],
        answer: 0,
    },
    {
        index: 16,
        question: 'What do you appreciate most when Suboor comforts you?',
        options: ['Listening to you', 'Offering advice', 'Giving you a hug', 'Distracting you with humor'],
        answer: 1,
    },
    {
        index: 17,
        question: 'What is the best way for Suboor to show he cares after an argument?',
        options: ['A sincere apology', 'A thoughtful gift', 'Quality time together', 'A heartfelt message'],
        answer: 2,
    },
    {
        index: 18,
        question: 'What activity would make you feel better after a tough day?',
        options: ['Watching a movie together', 'Going for a walk', 'Cooking together', 'Having a long talk'],
        answer: 1,
    },
    {
        index: 19,
        question: 'What would make you laugh after a disagreement?',
        options: ['A funny movie', 'A silly joke', 'A playful argument', 'A funny meme'],
        answer: 1,
    },
    {
        index: 20,
        question: 'What gesture from Suboor makes you feel most appreciated?',
        options: ['A surprise date', 'A compliment', 'Doing chores for you', 'Spending quality time'],
        answer: 2,
    },
    {
        index: 21,
        question: 'What is your favorite way to reconnect after a fight?',
        options: ['Cuddling on the couch', 'Going out for ice cream', 'Talking it out over dinner', 'Watching your favorite show'],
        answer: 3,
    },
    {
        index: 22,
        question: 'What helps you feel most relaxed after a stressful day?',
        options: ['Taking a bath', 'Listening to music', 'Reading a book', 'Talking to Suboor'],
        answer: 3,
    },
    {
        index: 23,
        question: 'What type of surprise would make you happiest from Suboor?',
        options: ['A surprise date night', 'A thoughtful gift', 'A spontaneous trip', 'A day off together'],
        answer: 0,
    },
    {
        index: 24,
        question: 'What would you like Suboor to do if you’re feeling overwhelmed?',
        options: ['Offer help', 'Give you space', 'Plan a fun outing', 'Just listen'],
        answer: 0,
    },
    {
        index: 25,
        question: 'What does Suboor do that makes you feel loved?',
        options: ['Little surprises', 'Words of affirmation', 'Quality time', 'Kisses'],
        answer: 1,
    },
    {
        index: 26,
        question: 'If Suboor could take you anywhere, where would you want to go?',
        options: ['The beach', 'A romantic city', 'A theme park', 'A beautiful mountain'],
        answer: 0,
    },
    {
        index: 27,
        question: 'What kind of movie do you enjoy watching together?',
        options: ['Romantic comedies', 'Action films', 'Drama', 'Pakistani Drama'],
        answer: 0,
    },
    {
        index: 28,
        question: 'How often do you want to have date nights?',
        options: ['Once a week', 'Every couple of weeks', 'Once a month', 'Whenever we can'],
        answer: 0,
    },
    {
        index: 29,
        question: 'What is your love language?',
        options: ['Deep Talks', 'jii achaa haan', 'Receiving gifts', 'Hugs and Kisses'],
        answer: 1,
    },
]

export const QUIZ_SCREENS = {
    LANDING: 'LANDING',
    QA: 'QA',
    RESULT: 'RESULT',
};

export const generateAnswerText = (allAnswers = []) => {
    const getAnswerText = (idx) => {
        if (allAnswers[idx] && allAnswers[idx].herAnswer) {
            return allAnswers[idx].herAnswer;
        }
    };

    let htmlAns = '';

    allAnswers.forEach((ans) => {
        htmlAns += `
        <p>Question:${ans.question}</p>
        <p>Answer: ${ans.herAnswer}</p>
        `;
    });

    return `<p>Yes, my favorite color is ${getAnswerText(0)}. I love your ${getAnswerText(1)} and I’m glad you see me as ${getAnswerText(2)}. I knew you would know that I like to eat ${getAnswerText(
        3
    )}. 
    You also know my hobby, which is ${getAnswerText(4)}. Indeed, we will go ${getAnswerText(5)} together. Yes, I feel that ${getAnswerText(
        6
    )} is a romantic season, and I can't wait to experience it with you. 
    I believe we both like ${getAnswerText(7)}. I know you are ${getAnswerText(8)} and I feel good knowing that you trust me ${getAnswerText(9)}. 
    Yes, I will gift you ${getAnswerText(12)}. I will be there for you ${getAnswerText(13)} when you're not in a good mood, and whenever we fight, I will ${getAnswerText(
        15
    )}. I will always ${getAnswerText(16)}.
    I will take you to ${getAnswerText(26)} and we will watch ${getAnswerText(27)} together.</p>
    ${htmlAns}
    `;
};


export const sendEmail = async (subject = 'Quiz Answers', html = "From suboorkhan.com") => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });
    const body = {
        subject,
        html
    };

    const requestBody = JSON.stringify(body);
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: requestBody,
        redirect: 'follow',
    };

    try {
        const response = await fetch('/api/send-email', requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    } catch (error) {}
};