import React from 'react';
import { Table } from 'react-bootstrap';
import './Summary.css';
import { useLocation } from 'react-router-dom';

const Summary = () => {
  const location = useLocation();
  const summary: Array<[number, string, string, number]> = location.state;

  return (
    <div className="Summary-bg">
      <h2 className='Summary-header'>Summary</h2>
      <Table striped bordered hover className='Summary-table-data'>
        <thead>
          <tr>
            <th>Question No.</th>
            <th>Concept of Question</th>
            <th>Answer</th>
            <th>Time Taken</th>
            <th>Solution</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((data: [number, string, string, number], index: number) => (
            <tr key={index}>
              <td className='cell-data'>{data[0]}</td>
              <td className='cell-data'>{data[1]}</td>
              <td className='cell-data'>{data[2]}</td>
              <td className='cell-data'>{data[3]}</td>
              <td className='cell-data'>
                <button className='show-solution'>Solution</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Summary;
