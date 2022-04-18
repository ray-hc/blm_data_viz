/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { appendData, loadChart } from '../../data_js/chart';

/*
Adapted from https://github.com/jukuznets/d3-line-chart/tree/gh-pages
to fit React, ES6.
*/

const LineChart = () => {
  const d3Ref = useRef(null);
  const [checkedVal, setCheckedVal] = useState(null);
  const [chartDetails, setChartDetails] = useState(null);

  // Mount Effect
  useEffect(() => {
    const mChartDetails = loadChart();
    console.log(mChartDetails);
    setChartDetails(mChartDetails);
    console.log('Mounted D3');
  }, []);

  // Unmount Effect -- will run callback on destroy.
  useEffect(() => {
    return () => {
      console.log('Cleaned up D3!');
    };
  }, []);

  return (
    <>
      <div id="root" ref={d3Ref}>
        <div id="options">
          <label>
            <input name="radio" type="radio" onChange={() => { appendData(chartDetails, 'AllAdopters'); setCheckedVal(0); }} checked={checkedVal === 0} />
            2018
          </label>
          <label>
            <input name="radio" type="radio" onChange={() => { appendData(chartDetails, 'GeoAdopters'); setCheckedVal(1); }} checked={checkedVal === 1} />
            2019
          </label>
          <label>
            <input name="radio" type="radio" onChange={() => { appendData(chartDetails, 'MnAdopters'); setCheckedVal(2); }} checked={checkedVal === 2} />
            2020
          </label>
        </div>
      </div>
    </>
  );
};

export default LineChart;
