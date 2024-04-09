import React, { useState, useEffect } from 'react';
import CountdownTimer from '../CountDownTimer/CountDownTimer';
import './TestEnvironment.css';
import data from './questions.json';
import { useNavigate} from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  concept: string;
  ans?: string; // Make ans property optional
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
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [questionStartTimes, setQuestionStartTimes] = useState<number[]>([]);
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [questionData, setQuestionData] = useState<Array<[number, string, string, number]>>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchedQuizData: QuizData = data;
    setQuizData(fetchedQuizData);
    setTextAreaValues(Array(fetchedQuizData.questions.length).fill(''));
    setQuestionStartTimes(Array(fetchedQuizData.questions.length).fill(0));

    // Initialize start time for the first question
    if (fetchedQuizData.questions.length > 0) {
      setQuestionStartTimes((prevTimes) => {
        const currentTime = new Date().getTime();
        const updatedTimes = [...prevTimes];
        updatedTimes[0] = currentTime;
        return updatedTimes;
      });
    }
  }, []);

  useEffect(() => {
    if (questionData.length > 0) {
      console.log(questionData)
      navigate('/Summary',{state : questionData});
    }
  }, [questionData, navigate]);

  const navigateToQuestion = (direction: 'prev' | 'next') => {
    if (!showResults) {
      const currentTime = new Date().getTime();
      const prevQuestionStartTime = questionStartTimes[currentQuestion];
      const timeSpent = (currentTime - prevQuestionStartTime) / 1000;

      setQuestionTimes((prevTimes) => {
        const updatedTimes = [...prevTimes];
        updatedTimes[currentQuestion] = Math.round(timeSpent);
        return updatedTimes;
      });

      setCurrentQuestion((prevCurrentQuestion) => {
        setTextAreaValues((prevValues) => {
          const updatedValues = [...prevValues];
          updatedValues[prevCurrentQuestion] = textAreaValues[prevCurrentQuestion];
          return updatedValues;
        });

        if (direction === 'prev' && prevCurrentQuestion > 0) {
          setQuestionStartTimes((prevTimes) => {
            const updatedTimes = [...prevTimes];
            updatedTimes[prevCurrentQuestion - 1] = currentTime;
            return updatedTimes;
          });
          return prevCurrentQuestion - 1;
        } else if (direction === 'next' && prevCurrentQuestion < quizData!.questions.length - 1) {
          setQuestionStartTimes((prevTimes) => {
            const updatedTimes = [...prevTimes];
            updatedTimes[prevCurrentQuestion + 1] = currentTime;
            return updatedTimes;
          });
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
    const currentTime = new Date().getTime();
  
    quizData?.questions.forEach((question, index) => {
      const answerEntered = textAreaValues[index].trim().toLowerCase();
      const correctAnswer = question.ans?.trim().toLowerCase() || ''; // Handle case where ans might be undefined
  
      if (answerEntered === correctAnswer) {
        correctAnswersList.push(correctAnswer);
      } else if (answerEntered === '') {
        skipped++;
        skippedIndices.push(index);
      } else {
        incorrect++;
        incorrectQuestionsList.push(correctAnswer);
      }
  
      const prevQuestionStartTime = questionStartTimes[index];
      const timeSpent = (currentTime - prevQuestionStartTime) / 1000; // Convert to seconds
      setQuestionTimes((prevTimes) => {
        const updatedTimes = [...prevTimes];
        updatedTimes[index] = Math.round(timeSpent);
        return updatedTimes;
      });
    });
  
    setCorrectAnswers(correctAnswersList);
    setIncorrectQuestions(incorrectQuestionsList);
    setSkippedQuestionIndices(skippedIndices);
  
    setShowResults(true);
    setTestSubmitted(true);
  
    // Prepare data for summary page and navigate to it
    const newQuestionData: [number, string, string, number][] = quizData?.questions.map((question, index) => {
      return [
        question.id,
        question.concept,
        textAreaValues[index] || '', // If no answer provided, pass an empty string
        questionTimes[index] || 0 // If no time recorded, pass 0
      ];
    }) || [];
    setQuestionData(newQuestionData);
  };
  

  const handleTimerEnd = () => {
    calculateResults();
  };

  if (!quizData) {
    return null;
  }

  const totalQuestions = quizData.questions.length;
  const initialTime = totalQuestions * 120;

  const question = quizData.questions[currentQuestion];

  return (
    <div className="quiz-container">
      <h1 className="title11">Test</h1>
      {!testSubmitted && <CountdownTimer onTimerEnd={handleTimerEnd} initialTime={initialTime} />}
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
          disabled={currentQuestion === totalQuestions - 1 || showResults}
        >
          Next
        </button>
      </div>
      {currentQuestion === totalQuestions - 1 && !showResults && (
        <button className="submit-button1" onClick={() => calculateResults()}>
        Submit Test
        </button>)}
    </div>
  );
};

export default TestEnvironment;
