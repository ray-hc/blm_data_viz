/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { loadChart } from '../../d3_render/dtLineChart';
import { appendData } from '../../d3_render/dtLineChartMultiView';

/*
Adapted from https://github.com/jukuznets/d3-line-chart/tree/gh-pages
to fit React, ES6.
*/

const DtLineChartMultiView = (props) => {
  const d3Ref = useRef(null);
  const [checkedVal, setCheckedVal] = useState(null);
  const [chartDetails, setChartDetails] = useState(null);

  const {
    chartId, filename, dCols, heightRatio,
  } = props;

  // Mount Effect
  useEffect(() => {
    const mChartDetails = loadChart(`#${chartId}`, 'Median', heightRatio);
    console.log(mChartDetails);
    setChartDetails(mChartDetails);
    setCheckedVal(0);
    appendData(mChartDetails, 'Following', filename, 'Median "Following" Over Time');
    console.log('Mounted D3');
  }, []);

  // Unmount Effect -- will run callback on destroy.
  useEffect(() => {
    return () => {
      console.log('Cleaned up D3!');
    };
  }, []);

  const genColDisplays = () => {
    const options = [];

    dCols.forEach((col, i) => {
      options.push(
        <label key={col}>
          <input
            name="radio"
            type="radio"
            onChange={() => { appendData(chartDetails, col, filename, `Median "${col}" Over Time`); setCheckedVal(i); }}
            checked={checkedVal === i}
          />
          {col}
        </label>,
      );
    });

    return options;
  };

  return (
    <>
      <div id={chartId} ref={d3Ref}>
        <div id="options">
          {genColDisplays()}
        </div>
      </div>
    </>
  );
};

export default DtLineChartMultiView;
