import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainpage from './Mainpage';
import PuzzleGame from './components/PuzzleGame';
import PuzzleGame1 from './components/PuzzleGame1';
import PuzzleGame2 from './components/PuzzleGame2';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage/>} />
        <Route path="/puzzle1" element={<PuzzleGame />} />
        <Route path="/puzzle2" element={<PuzzleGame1 />} />
        <Route path="/puzzle3" element={<PuzzleGame2 />} />
      </Routes>
    </Router>
  );
};

export default App;
