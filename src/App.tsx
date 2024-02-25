import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import MCQGeneration from './pages/MCQGeneration/MCQGeneration';
import TestEnvironment from './components/TestEnvironment/TestEnvironment';
import CheckAnwers from './components/TestEnvironment/CheckAnswers';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mcq" element={<MCQGeneration />} />
        <Route path="/test" element={<TestEnvironment />} />
        <Route path='/test/checkAnswers' element={<CheckAnwers correctAnswers={[]}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
