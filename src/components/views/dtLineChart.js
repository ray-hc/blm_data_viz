/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { loadChart, appendData } from '../../d3_render/dtLineChart';
import TableFromCSV from './tableFromCSV';

/*
Adapted from https://github.com/jukuznets/d3-line-chart/tree/gh-pages
to fit React, ES6.
*/

const DtLineChart = (props) => {
  const d3Ref = useRef(null);
  const [tableVisible, setTableVisible] = useState(false);

  const {
    chartId, filename, dCols, heightRatio, yAxisLabel, title,
  } = props;

  // Mount Effect
  useEffect(() => {
    const mChartDetails = loadChart(`#${chartId}`, yAxisLabel, heightRatio);
    console.log(mChartDetails);
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
    <>
      <button type="button" onClick={() => setTableVisible(!tableVisible)}>View as Table</button>
      <div id={chartId} ref={d3Ref} />
      {tableVisible && <TableFromCSV csvFilename={filename} />}
    </>
  );
};

export default DtLineChart;
