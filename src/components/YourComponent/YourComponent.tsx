import React from 'react';
import './YourComponent.css'; 
import card1 from  '../../assets/images/card1.png'
import card2 from  '../../assets/images/card2.png'
import card3 from  '../../assets/images/card3.png'

const YourComponent: React.FC = () => {
  return (
    <div className="your-component">
      <h2 className='h2-des2'>
              <span>Who is it used for?</span>
            </h2>
      <div className="cards-container">
        {/* Card 1: Teachers and Schools */}
        <div className="card">
          <img src={card1} alt="Teachers and Schools" style={{ width: '300px', height: '300px' }} />
          <p>
            Teachers and Schools can use the Smartmcq authoring tool to create worksheets easily in a few seconds. They
            can avoid repetitive questions chosen from a fixed question bank every year.
          </p>
        </div>

        {/* Card 2: HR Teams */}
        <div className="card">
          <img src={card2} alt="Teachers and Schools" style={{ width: '360px', height: '300px', margin: '0 auto' }} />
          <p>
            HR teams can use Smartmcq to create assessments from compliance documents. Every time there is a change in
            policies, assessments could be generated and given to employees to make sure that they have read and
            understood the new policies.
          </p>
        </div>

        {/* Card 3: Publishers and Edtech Companies */}
        <div className="card">
          <img src={card3} alt="Teachers and Schools" style={{ width: '300px', height: '300px', margin: '0 auto' }}/>
          <p>
            Textbook publishers and edtech companies can use Smartmcq instead of outsourcing the assessment creation
            process. They can have a small in-house team and save hugely on time and cost.
          </p>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
