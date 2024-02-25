import React, { useState } from 'react';
import './MCQGeneration.css';
import data from '../../components/TestEnvironment/questions.json';
import MCQCard from '../../components/MCQCard/MCQCard';
import { Link, useNavigate } from "react-router-dom";

interface Question {
  ID: number;
  Question: string;
  ans: string;
}

interface QuizData {
  questions: Question[];
}

const MCQGeneration: React.FC = () => {
  const [text, setText] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(event.target.value);
  };

  const handleSubmit = async () => {
    // Parse the JSON data and structure it according to the QuizData interface
    const formattedData: QuizData = {
      questions: data.questions.map((question: any) => ({
        ID: question.id,
        Question: question.text,
        ans: question.ans
      }))
    };
    setQuizData(formattedData);
    setFormSubmitted(true);
  };

  const sendMCQDataToTest = () => {    
    navigate('/test', { state: quizData });
  };

  const countWords = (text: string) => {
    const words = text.split(/\s+/).filter((word) => word.length > 0);
    return words.length;
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleQuestionChange = (newQuestion: string, index: number) => {
    // You need to update the questions array within quizData
    if (quizData) {
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[index].Question = newQuestion;
      setQuizData({ ...quizData, questions: updatedQuestions });
    }
  };

  return (
    <div className='MCQGeneration-container'>
      <button className='mcq-logout'>Logout</button>
      <h1 className="instruction">
        Generate various quizzes, focusing primarily on multiple-choice questions (MCQs), utilizing AI technology.
      </h1>
      <div className="mcq-section">
        <div className="left-section">
          <h3 className="suggested-length">
            Suggested text length: 50 - 3000 words.
          </h3>
          <label className='text-input-word-count' htmlFor="text-input">Word Count: <span>{countWords(text)}</span></label>
          <textarea
            id="text-input"
            className="text-input"
            placeholder="Enter your text here..."
            value={text}
            onChange={handleTextChange}
          />
          <div className="difficulty-section">
            <label className='difficulty-label' htmlFor="difficulty">Difficulty level:</label>
            <select
              id="difficulty"
              className="difficulty-select"
              value={difficulty}
              onChange={handleDifficultyChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <div className="right-section">
          {formSubmitted && (
            <div className='mcq-button-container'>
               <button className='take-test-mcq' onClick={sendMCQDataToTest}>Take Test</button>
              <div>
              {isEditing ? (
                <button className='save-mcq' onClick={handleEditClick}>
                  Save
                </button>
              ) : (
                <button className='edit-mcq' onClick={handleEditClick}>
                  Edit
                </button>
              )}
              </div>
            </div>
          )}
          {quizData && quizData.questions.map((question, index) => (
            <MCQCard
              key={index} // Using index as key assuming questions are unique in the array
              QuizData={question} // Pass Question object
              isEditing={isEditing}
              onQuestionChange={(newQuestion) => handleQuestionChange(newQuestion, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MCQGeneration;
