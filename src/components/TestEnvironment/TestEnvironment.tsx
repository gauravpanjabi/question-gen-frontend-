import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TestEnvironment.css';
import data from './questions.json';


interface Question {
  text: string;
  ans: string;
}

interface QuizData {
  questions: Question[];
}

interface SelectedOptionsMap extends Map<number, string> {}

const TestEnvironment: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [textAreaValues, setTextAreaValues] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [skippedQuestions, setSkippedQuestions] = useState<number>(0);

  useEffect(() => {
    const fetchedQuizData: QuizData = data;
    setQuizData(fetchedQuizData);
    setTextAreaValues(Array(fetchedQuizData.questions.length).fill(''));
  }, []);

  const handleOptionChange = (questionIndex: number, selectedValue: string) => {
    // handle radio button changes if needed
  };

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

    quizData?.questions.forEach((question, index) => {
      const answerEntered = textAreaValues[index].trim().toLowerCase();
      const correctAnswer = question.ans.trim().toLowerCase();

      if (answerEntered === correctAnswer) {
        correct++;
      } else if (answerEntered === '') {
        skipped++;
      } else {
        incorrect++;
      }
    });

    setCorrectAnswers(correct);
    setIncorrectAnswers(incorrect);
    setSkippedQuestions(skipped);

    setShowResults(true);
  };

  if (!quizData) {
    return null;
  }

  const question = quizData.questions[currentQuestion];

  return (
    <div className="quiz-container">
      <h1 className="title11">MCQ Test</h1>
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
          <p className='summary-statistics'>Correct Answers: {correctAnswers}</p>
          <p className='summary-statistics'>Incorrect Answers: {incorrectAnswers}</p>
          <p className='summary-statistics'>Skipped Questions: {skippedQuestions}</p>
        </div>
      )}

      {showResults && (
        <Link to="/test/checkAnswers">
          <button className="submit-button1">
            Check Answers
          </button>
        </Link>
      )}
    </div>
  );
};

export default TestEnvironment;
