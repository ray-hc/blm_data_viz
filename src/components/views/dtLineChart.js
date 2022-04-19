/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import { loadChart, appendData } from '../../d3_render/dtLineChart';

/*
Adapted from https://github.com/jukuznets/d3-line-chart/tree/gh-pages
to fit React, ES6.
*/

const DtLineChart = (props) => {
  const d3Ref = useRef(null);
  // const [chartDetails, setChartDetails] = useState(null);

  const {
    chartId, filename, dCols, heightRatio, yAxisLabel, title,
  } = props;

  // Mount Effect
  useEffect(() => {
    const mChartDetails = loadChart(`#${chartId}`, yAxisLabel, heightRatio);
    console.log(mChartDetails);
    // setChartDetails(mChartDetails);
    appendData(mChartDetails, dCols, filename, title);
    console.log('Mounted D3');
  }, []);

  // Unmount Effect -- will run callback on destroy.
  useEffect(() => {
    return () => {
      console.log('Cleaned up D3!');
    };
  }, []);

  return (
    <div id={chartId} ref={d3Ref} />
  );
};

export default DtLineChart;
