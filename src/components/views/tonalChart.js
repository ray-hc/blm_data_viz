/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { loadTonalChart } from '../../d3render/tonalChartD3';

/*
Adapted from https://github.com/jukuznets/d3-line-chart/tree/gh-pages
to fit React, ES6.
*/

const TonalChart = (props) => {
  const {
    chartId,
  } = props;

  // Mount Effect
  useEffect(() => {
    loadTonalChart();
  }, []);

  // Unmount Effect -- will run callback on destroy.
  useEffect(() => {
    return () => {
      console.log('Cleaned up D3!');
    };
  }, []);

  return (
    <>
      <div id={chartId} />
    </>
  );
};

export default TonalChart;
