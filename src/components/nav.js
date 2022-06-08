import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" exact>Introduction</NavLink></li>
        <li><NavLink to="/lit">Why Hashtags</NavLink></li>
        <li><NavLink to="/findingsA">Overall Trends</NavLink></li>
        <li><NavLink to="/findingsB">Trends Across US</NavLink></li>
        <li><NavLink to="/findingsC">Social Contagion</NavLink></li>
        <li><NavLink to="/simulations">Simulations</NavLink></li>
      </ul>
    </nav>
  );
};

export default Nav;
