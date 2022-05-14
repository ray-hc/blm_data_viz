/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { feature } from 'topojson-client';
import * as d3 from 'd3';
import { playSound, stopSound } from './tonalChartD3';

const loadGeoChart = (width, height, id) => {
  const frame = d3.select(`#${id}`);

  const vW = 1000;
  const vH = 500;

  // Generate the SVG w/in which this will all occur.
  const svg = frame
    .append('div')
    .attr('class', 'svg')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, vW, vH]);

  // Attach the tooltip!
  const div = frame.append('div')
    .attr('class', 'tooltip');

  // Load the geometric framework
  const projection = d3.geoNaturalEarth1();
  const pathGenerator = d3.geoPath()
    .projection(projection);

  // We want to Zoom about the map!
  const handleZoom = (e) => {
    svg
      .attr('transform', e.transform);
  };
  const zoom = d3.zoom()
    .scaleExtent([1, 4])
    .translateExtent([[0, 0], [vW * 2, vH * 2]])
    .on('zoom', handleZoom);

  svg.call(zoom);
  frame
    .append('button')
    .text('Center')
    .on('click', (d, i) => {
      const k = d3.zoomTransform(svg.node()).k;
      console.log(k);
      svg
        .transition()
        .call(
          zoom.transform, d3.zoomIdentity.scale(k),
        );
    });

  // Load the actual data!
  d3.json('../../datasets/world_topojson.json')
    .then((mapData) => {
      d3.csv('../../datasets/country_counts_w_names.csv')
        .then((twtData) => {
          const countries = feature(mapData, mapData.objects.countries); // get the list of countries' objects.
          const twtDataMap = new Map(
            twtData.map((object) => {
              return [object.engName, object.adopters];
            }),
          );

          const paths = svg.selectAll('.country').data(countries.features) // for each country, plot it!
            .enter().append('path')
            .attr('class', 'country')
            .attr('d', pathGenerator);

          paths.each((d, i) => {
            const centroid = pathGenerator.centroid(d);
            d.cx = centroid[0];
            d.cy = centroid[1];
            d.adopters = twtDataMap.get(d.properties.name);
          });

          const dMin = d3.min(countries.features, (d__) => parseInt(d__.adopters, 10));
          const dMax = d3.max(countries.features, (d__) => parseInt(d__.adopters, 10));

          svg.selectAll('circle')
            .data(countries.features)
            .enter()
            .append('circle')
            .attr('class', 'bubble')
            .attr('r', (d) => {
              if (d.adopters) {
                return Math.log(d.adopters) ** 1.8 + 0.1;
              } else {
                return 0;
              }
            })
            .attr('cx', (d) => (d.cx))
            .attr('cy', (d) => (d.cy))
            .on('mouseover', (d, i) => {
              div.html(`${i.properties.name}: ${i.adopters}`)
                .style('left', `${d.pageX}px`)
                .style('top', `${d.pageY}px`);
            })
            .on('mousemove', (d, _) => {
              div
                .style('left', `${d.pageX + 7}px`)
                .style('top', `${d.pageY + 8}px`);
            })
            .on('click', (_, i) => {
              playSound(i.adopters, dMin, dMax);
            })
            .on('mouseout', () => {
              stopSound();
            });

          svg
            .on('mouseout', () => {
              div.style('display', 'none');
            })
            .on('mouseover', () => {
              div.style('display', 'block');
            });
        });
    });
};

export { loadGeoChart };
