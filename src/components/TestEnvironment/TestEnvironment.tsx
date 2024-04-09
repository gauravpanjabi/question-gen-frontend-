import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountdownTimer from '../CountDownTimer/CountDownTimer'; // Import CountdownTimer component
import './TestEnvironment.css';
import data from './questions.json';
import CheckAnswers from './CheckAnswers';

interface Question {
  text: string;
  ans: string;
}

interface QuizData {
  questions: Question[];
}

const TestEnvironment: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [textAreaValues, setTextAreaValues] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [incorrectQuestions, setIncorrectQuestions] = useState<string[]>([]);
  const [skippedQuestionIndices, setSkippedQuestionIndices] = useState<number[]>([]);
  const [timerEnded, setTimerEnded] = useState<boolean>(false); // Add timer state
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false); // Add testSubmitted state

  useEffect(() => {
    const fetchedQuizData: QuizData = data;
    setQuizData(fetchedQuizData);
    setTextAreaValues(Array(fetchedQuizData.questions.length).fill(''));
  }, []);

  const navigateToQuestion = (direction: 'prev' | 'next') => {
    if (!showResults) {
      setCurrentQuestion((prevCurrentQuestion) => {
        setTextAreaValues((prevValues) => {
          const updatedValues = [...prevValues];
          updatedValues[prevCurrentQuestion] = textAreaValues[currentQuestion];
          return updatedValues;
        });

        if (direction === 'prev' && prevCurrentQuestion > 0) {
          return prevCurrentQuestion - 1;
        } else if (direction === 'next' && prevCurrentQuestion < data.questions.length - 1) {
          return prevCurrentQuestion + 1;
        }
        return prevCurrentQuestion;
      });
    }
  };

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setTextAreaValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[currentQuestion] = value;
      return updatedValues;
    });
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    const incorrectQuestionsList: string[] = [];
    const skippedIndices: number[] = [];
    const correctAnswersList: string[] = [];

    quizData?.questions.forEach((question, index) => {
      const answerEntered = textAreaValues[index].trim().toLowerCase();
      const correctAnswer = question.ans.trim().toLowerCase();

      if (answerEntered === correctAnswer) {
        correct++;
        correctAnswersList.push(correctAnswer);
      } else if (answerEntered === '') {
        skipped++;
        skippedIndices.push(index);
      } else {
        incorrect++;
        incorrectQuestionsList.push(correctAnswer);
      }
    });

    setCorrectAnswers(correctAnswersList);
    setIncorrectQuestions(incorrectQuestionsList);
    setSkippedQuestionIndices(skippedIndices);

    setShowResults(true);
    setTimerEnded(true); // Stop the timer when the test is submitted
    setTestSubmitted(true); // Set testSubmitted to true
  };

  const handleTimerEnd = () => {
    setTimerEnded(true);
    calculateResults();
  };

  if (!quizData) {
    return null;
  }

  const question = quizData.questions[currentQuestion];

  return (
    <div className="quiz-container">
      <h1 className="title11">Test</h1>
      {!timerEnded && !testSubmitted && <CountdownTimer onTimerEnd={handleTimerEnd} />} {/* Render CountdownTimer */}
      <div className="question-card">
        <div className="question">{question.text}</div>
        <div>
          <textarea
            className='full-width-textarea'
            rows={10}
            placeholder='Enter your answer here'
            value={textAreaValues[currentQuestion]}
            onChange={handleTextAreaChange}
          ></textarea>
        </div>
      </div>

      <div className="navigation">
        <button
          className="prev-button"
          onClick={() => navigateToQuestion('prev')}
          disabled={currentQuestion === 0 || showResults}
        >
          Previous
        </button>
        <button
          className="next-button"
          onClick={() => navigateToQuestion('next')}
          disabled={currentQuestion === quizData.questions.length - 1 || showResults}
        >
          Next
        </button>
      </div>

      {currentQuestion === quizData.questions.length - 1 && !showResults && (
        <button className="submit-button1" onClick={() => calculateResults()}>
          Submit Test
        </button>
      )}

      {showResults && (
        <div className="summary">
          <h2 className='summary-statistics'>Summary</h2>
          <p className='summary-statistics'>Total Questions: {quizData.questions.length}</p>
          <p className='summary-statistics'>Correct Answers: {correctAnswers.length}</p>
          <p className='summary-statistics'>Incorrect Answers: {incorrectQuestions.length}</p>
          <p className='summary-statistics'>Skipped Questions: {skippedQuestionIndices.length}</p>
        </div>
      )}

      {showResults && (
        <div className="results">
          {incorrectQuestions.map((correctAnswer, index) => (
            <div key={index} className="result-item">
              <p className='result-text'>{`Question ${index + 2}: Incorrect`}</p>
              <p className='result-text'>{`Correct Answer: ${correctAnswer}`}</p>
            </div>
          ))}

          {skippedQuestionIndices.map((index, resultIndex) => (
            <div key={index} className="result-item">
              <p className='result-text'>{`Question ${index + 1 || 'NA'}: Skipped`}</p>
              <p className='result-text'>{`Correct Answer: ${quizData?.questions[index]?.ans || 'NA'}`}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestEnvironment;
