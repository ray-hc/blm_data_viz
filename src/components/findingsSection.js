/* eslint-disable max-len */
import React from 'react';
import DtLineChartMultiView from './views/dtLineChartMultiView';
import DtLineChart from './views/dtLineChart';

const FindingsSection = (props) => {
  const text = `The 'incubators', those users who were engaging with #BLM 
  before the surge in George Floyd-related activity, tend to be more active 
  and connected than other users. As #BLM adoption rose on the 26th, 
  hashtag users' median number of followers and following dropped.`;

  return (
    <div>
      <h1>Key Findings</h1>
      <h2>Adopter Characteristics Over Time</h2>
      <p>{text}</p>
      <DtLineChartMultiView
        chartId="flwrFlngChart"
        filename="https://raw.githubusercontent.com/ray-hc/blm_data_viz/main/datasets/mean_users_by_twts.csv"
        dCols={['Following', 'Followers']}
        heightRatio={0.4}
      />
      <DtLineChart
        chartId="adopterCumulChart"
        filename="https://raw.githubusercontent.com/ray-hc/blm_data_viz/main/datasets/twts_counts.csv"
        dCols={['AllAdopters', 'GeoAdopters', 'MnAdopters']}
        heightRatio={0.4}
      />
    </div>
  );
};

export default FindingsSection;
