import React, { useState,useEffect } from 'react';
import './MCQGeneration.css';
import data from '../../dummy.json';
import MCQCard from '../../components/MCQCard/MCQCard';
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'; 

interface MCQItem {
  ID: number;
  Question: string;
  options: string[];
}

const MCQGeneration: React.FC = () => {
  const [text, setText] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [mcqData, setMCQData] = useState<MCQItem[] | null>(null);
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
    // try {
    //   const response = await axios.get('YOUR_API_ENDPOINT');
    //   setMCQData(response.data);
    //   setFormSubmitted(true);
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }

    setMCQData(data);
    setFormSubmitted(true);
  };

  const sendMCQDataToTest = () => {    
    navigate('/test', { state:  mcqData  });
    // console.log(mcqData);
  };

  const countWords = (text: string) => {
    const words = text.split(/\s+/).filter((word) => word.length > 0);
    return words.length;
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleQuestionChange = (newQuestion: string, index: number) => {
    const updatedData = [...mcqData!];
    updatedData[index].Question = newQuestion;
    setMCQData(updatedData);
  };

  const handleOptionChange = (newOptions: string[], index: number) => {
    const updatedData = [...mcqData!];
    updatedData[index].options = newOptions;
    setMCQData(updatedData);
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
          <label className='text-input-word-count' htmlFor="text-input">Word Count: <span>{ countWords(text)}</span></label>
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
               <Link to='/test' state={{ mcqData: mcqData }}><button className='take-test-mcq' onClick={sendMCQDataToTest}>Take Test</button></Link>
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
          {mcqData &&
            mcqData.map((item, index) => (
              <MCQCard
                key={item.ID}
                mcqData={item}
                isEditing={isEditing}
                onQuestionChange={(newQuestion) => handleQuestionChange(newQuestion, index)}
                onOptionChange={(newOptions) => handleOptionChange(newOptions, index)}
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MCQGeneration;
