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
      <p>#BlackLivesMatter quickly became one of the most powerful rallying cries online, ever.</p>
      <DtLineChart
        chartId="twtCountChart"
        filename="https://raw.githubusercontent.com/ray-hc/blm_data_viz/main/datasets/twts_raw_count.csv"
        dCols={['Tw_ID']}
        heightRatio={0.4}
        yAxisLabel="Number of Tweets"
        title="Total #BLM Tweets Per Hour"
      />
      <h2>Adopter Characteristics Over Time</h2>
      <p>{text}</p>
      <DtLineChartMultiView
        chartId="flwrFlngChart"
        filename="https://raw.githubusercontent.com/ray-hc/blm_data_viz/main/datasets/mean_users_by_twts.csv"
        dCols={['Following', 'Followers']}
        heightRatio={0.4}
        yAxisLabel="Median"
      />
      <p>Geolocated Adopters had a relatively similiar rate of adoption as the overall adoption pool. However, users from Minnesota, home to Minneapolis, tended to adopt much earlier than others. </p>
      <DtLineChart
        chartId="adopterCumulChart"
        filename="https://raw.githubusercontent.com/ray-hc/blm_data_viz/main/datasets/twts_counts.csv"
        dCols={['MnAdopters', 'GeoAdopters', 'AllAdopters']}
        heightRatio={0.4}
        yAxisLabel="Cumulative Proportion"
        title="Cumulative Adoptions: Minnesotan, Geolocated, All "
      />
      <p>Need to add a set of labels!</p>
    </div>
  );
};

export default FindingsSection;
