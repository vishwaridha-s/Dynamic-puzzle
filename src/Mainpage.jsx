import React from 'react';
import { Link } from 'react-router-dom';
import './Mainpage.css';
const Mainpage = () => {
  return (
    <div id="options">
      <h1>choose your puzzle</h1>
      <Link to="/puzzle1">
        <img src="/images/endgame.jpg" alt="endgame"/>
      </Link>
      <Link to="/puzzle2">
        <img src="/images2/spiderman.jpg" alt="spiderman"/>
      </Link>
      <Link to="/puzzle3">
        <img src="/images3/batman.jpg" alt="batman" />
      </Link>
    </div>
  );
};
export default Mainpage;
