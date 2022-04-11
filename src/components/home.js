import React from 'react';
import MultilineChart from './views/MultilineChart';
import D3Base from './d3Base';

import test from '../data/test.json';

const dimensions = {
  width: 600,
  height: 300,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 60,
  },
};

const testData = {
  name: 'test',
  color: '#f0f0f0',
  items: test.map((d) => ({ ...d, date: new Date(d.date) })),
};

const Home = (props) => {
  return (
    <div className="App">
      <D3Base />
      <MultilineChart
        data={[testData]}
        dimensions={dimensions}
      />
    </div>

  );
};

export default Home;
