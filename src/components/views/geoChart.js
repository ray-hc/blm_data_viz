/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { loadGeoChart } from '../../d3render/cloroplethGlobalD3';

const GeoChart = (props) => {
  // Mount Effect
  useEffect(() => {
    loadGeoChart(800, 400, 'world');
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
      <div id="world" className="svg" />
    </>
  );
};

export default GeoChart;
