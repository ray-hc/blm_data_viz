/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import DtLineChartMultiView from '../d3-views/dtLineChartMultiView';
import DtLineChart from '../d3-views/dtLineChart';
import GeoChart from '../d3-views/geoChart';
import MusicScale from '../musicScale';

const FindingsASection = (props) => {
  return (
    <div>
      <h1>Overall Trends</h1>
      <p>In the days after George Floyd's murder, millions of people expressed their outrage and desire for change online. During the study period,
        14 million public tweets containing #BlackLivesMatter were sent by 5 million users.
      </p>
      <p>
        The viral diffusion of #BlackLivesMatter began on the morning of May 26th, roughly twelve hours after the incident.
        On May 28th, #BLM usage spiked as nationwide protests began,
        and #BlackLivesMatter rose again on May 31st and June 1st, around the time of Donald Trump's infamous photoshoot.
      </p>
      <DtLineChart
        chartId="twtCountChart"
        filename="https://raw.githubusercontent.com/ray-hc/blm_data_viz/main/datasets/twts_raw_count.csv"
        dCols={['Tweets']}
        heightRatio={0.4}
        yAxisLabel="Number of Tweets"
        title="Total #BLM Tweets Per Hour"
      />
      <p>Though Black Lives Matter began in the United States, it spread widely around the world. Just over half of geotagged tweets came from outside the United States.</p>
      <MusicScale dMin={0} dMax={40000} />
      <GeoChart
        chartId="world"
      />

      <h2>Adopter Characteristics Over Time</h2>
      <p>
        In order to understand processes like contagion, it's important to understand who is engaging online.
      </p>
      <p>
        An examination of user attributes finds that the earliest hashtag adopters tended to be much more well-connected on Twitter than those who came later. They also were much more likely
        to have previously used the hashtag.
      </p>
      <p>
        Given that #BLM usage tends to be episodic, the accounts who use #BLM outside of peak periods are critical to information diffusion,
        as these users can 'seed' the next viral event, informing the broader Twitter-sphere about important events.
      </p>
      <DtLineChartMultiView
        chartId="flwrFlngChart"
        filename="https://raw.githubusercontent.com/ray-hc/blm_data_viz/main/datasets/mean_users_by_twts.csv"
        dCols={['Following', 'Followers']}
        heightRatio={0.4}
        yAxisLabel="Median"
      />
      <p>
        Still, only examining account attributes paints an incomplete picture of diffusion.
        If we want to understand more about #BlackLivesMatter, we need to connect what was
        happening online with the offline world.
      </p>
      <p>To do so, we conduct a geographic analysis.
        findingsC
      </p>
      <Link to="/findingsB" className="next">NEXT: Contagion Results</Link>
    </div>
  );
};

export default FindingsASection;
