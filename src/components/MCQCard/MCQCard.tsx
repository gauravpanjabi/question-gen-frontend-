import React from 'react';
import './MCQCard.css';

interface MCQItem {
  ID: number;
  Question: string;
  options: string[];
}

interface MCQCardProps {
  mcqData: MCQItem;
  isEditing: boolean;
  onQuestionChange: (newQuestion: string) => void;
  onOptionChange: (newOptions: string[]) => void;
}

const MCQCard: React.FC<MCQCardProps> = ({mcqData,isEditing,onQuestionChange,onOptionChange}) => {
  
  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className="mcq-card">
      {isEditing ? (
        <textarea
          className="text-question"
          defaultValue={mcqData.Question}
          onChange={(e) => {
            handleAutoResize(e);
            onQuestionChange(e.target.value);
          }}
        />
      ) : (
        <div className="question">{mcqData.Question}</div>
      )}
      {/* <div className="options">
        {mcqData.options.map((option, index) => (
          <div className="option" key={index}>
            {isEditing ? (
              <div className='mcq-option-flex'>
                <span className="option-label" style={{marginTop:"10px"}}>
                  {String.fromCharCode(65 + index)}
                </span>
                <textarea
                  className="text-option"
                  defaultValue={option}
                  onChange={(e) => {
                    handleAutoResize(e);
                    const newOptions = [...mcqData.options];
                    newOptions[index] = e.target.value;
                    onOptionChange(newOptions);
                  }}
                />
              </div> 
            ) : (
              <div className='mcq-option-flex'>
                <span className="option-label">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </div>
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default MCQCard;
