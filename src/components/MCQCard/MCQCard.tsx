import React from 'react';
import './MCQCard.css';

interface QuizItem {
  ID: number;
  Question: string;
  ans: string;
}

interface QuizCardProps {
  QuizData: QuizItem;
  isEditing: boolean;
  onQuestionChange: (newQuestion: string) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ QuizData, isEditing, onQuestionChange }) => {
  
  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className="Quiz-card">
      {isEditing ? (
        <textarea
          className="text-question"
          defaultValue={QuizData.Question}
          onChange={(e) => {
            handleAutoResize(e);
            onQuestionChange(e.target.value);
          }}
        />
      ) : (
        <div className="question">{QuizData.Question}</div>
      )}
    </div>
  );
};

export default QuizCard;
