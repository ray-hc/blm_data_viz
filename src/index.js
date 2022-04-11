import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import App from './components/app';

// we now wrap App in a Provider
ReactDOM.render(
  <App />,
  document.getElementById('main'),
);

const mDiv = d3.select('#my_div');
mDiv.insert('svg');

const mSvg = d3.select('#my_div > svg');
mSvg.insert('rect');
mSvg.insert('rect');
mSvg.insert('rect');

const squares = d3.select('rect');
squares.style('fill', 'orange');

d3.selectAll('#my_div')
  .on('mouseover',
    (e, _) => {
      d3.select(e.target)
        .transition()
        .duration(1000)
        .style('background-color', 'green');
    })
  .on('mouseout',
    (e, _) => {
      d3.select(e.target)
        .transition()
        .duration(1000)
        .style('background-color', 'yellow');
    });
