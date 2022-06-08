/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import DtLineChart from '../d3-views/dtLineChart';
import Chord from '../d3-views/chord';

const FindingsBSection = (props) => {
  return (
    <div>
      <h1>Hashtag Adoption by Geography</h1>
      <p>In order to look at how users' experiences shaped hashtag adoption, I collected geotagged #BLM tweets and used them
        to determine a subset of users' county subdivision. (Note that I only looked at users inside the U.S.)
      </p>
      <p>
        Then, I pulled data from the American Community Survey and Mapping Police Violence datasets to match users to the characteristics of their subdivision,
        including racial demographics, income, and rate of police violence.
      </p>
      <p>
        I hypothesized that users from closer to the event, as well as users living in more urban and diverse areas, would be more likely to use the hashtag. Here's what I found:
      </p>
      <DtLineChart
        chartId="adopterCumulChart"
        filename="https://raw.githubusercontent.com/ray-hc/blm_data_viz/main/datasets/twts_counts.csv"
        dCols={['MnAdopters', 'GeoAdopters']}
        heightRatio={0.6}
        yAxisLabel="Cumulative Proportion"
        title="Minnesotan vs All Geolocated Adopters"
      />
      <h6><u>Green=Minnesotan Adopters, Red=All Geolocated Adopters</u></h6>

      <p>
        <br />First, users from Minnesota tended to adopt much earlier than individuals from other areas. The above chart has been normalized to
        illustrate what proportion of adopters came from what time period -- many users from Minnesota were using #BlackLivesMatter especially in the first twenty-four hours,
        likely due to their proximity.
      </p>
      <p>
        Yet there was another, much more surprising pattern that emerged out of my geographic analysis.
      </p>
      <p>
        I used a technique called <a href="https://scikit-learn.org/stable/modules/clustering.html#k-means">K-Means Clustering</a> to seperate county subdivisions into six clusters based on percent White, percent Black, population density, police killings per square mile, and White per capita income.
        I had found using linear regression that these were some of the most predictive factors of high #BlackLivesMatter adoption.
      </p>
      <p>
        Below, I've included a 3d scatterplot showing the county subdivisions according to 3 of their most prominent features: percent White, population density, and White income.
      </p>
      <img src="https://www.raycrist.com/pics/kMeans.png" alt="A 3D scatterplot with #BLM." />

      <p>
        <br />
        I've named each of these clusters based on their most salient characteristics:
      </p>
      <ul>
        <li>
          the low-density, racially homogenous <u>Rur.White</u> cluster
        </li>
        <li>
          the medium-density <u>Sub.Blacker</u> cluster with its large Black population
        </li>
        <li>
          the medium-density, high-income <u>Sub.Richer</u> cluster
        </li>
        <li> the high-density <u>BigCities</u> cluster
        </li>
        <li> the <u>SubRur.Poorer</u> cluster, which spans the divide between the Rur.White and Sub.Richer cluster, and
        </li>
        <li> the medium-density <u>MidCities</u> cluster, which is most notable for encompassing Minneapolis and the surrounding area.
        </li>
      </ul>
      <img src="https://www.raycrist.com/pics/rep_subdiv.png" alt="Subdiv." />

      <p>
        <br />
        Examining these clusters based upon their per-capita adoption rate, there are some striking differences in behavior:
      </p>
      <DtLineChart
        chartId="clusterPerCapChart"
        filename="https://raw.githubusercontent.com/ray-hc/blm_data_viz/main/datasets/AdopPerCapByCluster.csv"
        dCols={['BigCities', 'SubRur.Poorer', 'MidCities', 'Rur.White', 'Sub.Blacker', 'Sub.Richer']}
        heightRatio={0.8}
        yAxisLabel="Cumulative Proportion"
        title="Adoptions Per Capita by Cluster"
        colors={{ 0: 'blue', 1: 'red' }}
      />
      <img src="https://www.raycrist.com/pics/scale.png" alt="scale" className="halfWidth" />

      <p><br />By far, the highest rate of adoption per-capita were in large cities, which had 10x the level of adoption as predominantly rural, White areas.</p>
      <p>This effect is even more surprising when you consider that large cities tended to adopt #BLM at a much higher rate,
        even in the earliest time period, than the cluster containing Minneapolis.
      </p>
      <p>The importance of BigCities continues, however, even if we look at a network analysis. The below chord diagram illustrates who followed whom in each cluster. Hover over each cluster to view just those relationships. The arrows represent who was followed by whom.
      </p>
      <Chord />
      <p>
        Not only were BigCities individuals adopting #BlackLivesMatter at the highest rates, but they also were the most well-connected, and the most followed group of users by every other cluster (even when compared to the other cluster's own group of users).
      </p>
      <h2>Implications</h2>
      <p>
        The dominance of the BigCities cluster points to the heterogeneity of the #BlackLivesMatter counterpublic.
        This finding could be interpreted in two ways: on the one hand, the dominance of the BigCities cluster may be better
        attributed to the modern urban-rural political divide in this country, along with the age-old dynamic whereby those individuals from cities dominate the discourse.
      </p>
      <p>
        Alternatively, these urban voices could represent marginalized individuals living in the most concentrated regions
        of police violence — those individuals who would previously not have had the ability to influence the public sphere
        but who are now able to. This utopian ideal is suggested in (Welles and Jackson 2019), where they find that Twitter
        providees an opportunity for urban individuals to counter mainstream narratives in the media about urban unrest.
      </p>
      <p>It is notable that urban areas fueled hashtag diffusion, given that the construction of the modern American city
        was fueled by racialized policies on everything from housing to infrastructure and education, White flight, and
        broken-windows policing (Derickson 2017).
      </p>
      <p>After all, without racial inequality, there would not be a predominantly
        white Sub.Richer cluster or a diverse BigCities cluster. While further research should be able to conclusively
        argue what urban engagement represents, what my research does reveal is that urban individuals are essential to
        the process of hashtag diffusion.
      </p>
      <Link to="/findingsC" className="next">NEXT: Contagion Results</Link>
    </div>
  );
};

export default FindingsBSection;
