import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" exact>Introduction</NavLink></li>
        <li><NavLink to="/findings">Key Findings</NavLink></li>
        <li><NavLink to="/methods">Methods</NavLink></li>
        <li><NavLink to="/related-work">Related Work</NavLink></li>
        <li><NavLink to="/simulations">Simulations</NavLink></li>
      </ul>
    </nav>
  );
};

export default Nav;
