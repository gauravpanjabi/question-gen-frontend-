import React, { useState, useEffect } from 'react';
import './TestEnvironment.css';
import data from './questions.json';

interface Question {
  text: string;
  ans: string;
}

interface QuizData {
  questions: Question[];
}

const CheckAnswers: React.FC<{ correctAnswers: string[] }> = ({ correctAnswers }) => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  useEffect(() => {
    const fetchedQuizData: QuizData = data;
    setQuizData(fetchedQuizData);
  }, []);

  return (
    <div className='quiz-container'>
      <h1 className="title11">Check Answers</h1>

      {correctAnswers.map((correctAnswer, index) => (
        <div key={index} className="result-item">
          <p className='result-text'>{`Question ${index + 1}: Correct Answer`}</p>
          <p className='result-text'>{`Correct Answer: ${correctAnswer}`}</p>
        </div>
      ))}
    </div>
  );
};

export default CheckAnswers;
