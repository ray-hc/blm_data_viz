/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import * as d3 from 'd3';
// eslint-disable-next-line react/no-deprecated
import { edgesMatrix } from '../../datasets/edgesMatrix';

const loadChord = (cId) => {
  const width = 840;
  const height = width;
  const innerRadius = Math.min(width, height) * 0.5 - 20;
  const outerRadius = innerRadius + 6;

  const ribbon = d3.ribbonArrow()
    .radius(innerRadius - 0.5)
    .padAngle(1 / innerRadius);

  const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const chord = d3.chordDirected()
    .padAngle(12 / innerRadius)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending);

  const colors = {
    0: 'black', 1: 'violet', 2: 'orange', 3: 'lightseagreen', 4: 'red', 5: 'blue',
  };
  const labels = {
    0: 'Rur.White', 1: 'Sub.Blacker', 2: 'Sub.Richer', 3: 'BigCities', 4: 'SubRur.Poorer', 5: 'MidCities',
  };

  const svg = d3.select(`#${cId}`)
    .append('svg')
    .attr('viewBox', [-width / 2, -height / 2, width, height]);

  const chords = chord(edgesMatrix);

  svg.append('path')
    .attr('fill', 'none')
    .attr('d', d3.arc()({ outerRadius, startAngle: 0, endAngle: 2 * Math.PI }));

  svg.append('g')
    .selectAll('g')
    .data(chords)
    .join('path')
    .attr('d', ribbon)
    .attr('fill', (d) => colors[d.source.index])
    .style('mix-blend-mode', 'multiply')
    .append('title')
    .text((d) => `${labels[d.source.index]} owes ${labels[d.target.index]} ${(d.source.value)}`);

  svg.append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .selectAll('g')
    .data(chords.groups)
    .join('g')
    .call((g) => g.append('path')
      .attr('d', arc)
      .attr('fill', (d) => colors[d.index])
      .attr('stroke', '#fff'))
    .call((g) => g.append('title')
      .text((d) => `${labels[d.index]}`));
};

const loadChordX = (cId) => {
  const width = 840;
  const height = width;
  const innerRadius = Math.min(width, height) * 0.5 - 20;
  const outerRadius = innerRadius + 6;

  const ribbon = d3.ribbonArrow()
    .radius(innerRadius - 0.5)
    .padAngle(1 / innerRadius);

  const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const chord = d3.chordDirected()
    .padAngle(12 / innerRadius)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending);

  const colors = {
    0: 'black', 1: 'violet', 2: 'orange', 3: 'lightseagreen', 4: 'red', 5: 'blue',
  };
  const labels = {
    0: 'Rur.White', 1: 'Sub.Blacker', 2: 'Sub.Richer', 3: 'BigCities', 4: 'SubRur.Poorer', 5: 'MidCities',
  };

  const svg = d3.select(`#${cId}`)
    .append('svg')
    .attr('viewBox', [-550, -500, 1050, 1000])
    .attr('font-size', 10)
    .attr('font-family', 'sans-serif')
    .style('width', '100%')
    .style('height', 'auto');

  const chords = chord(edgesMatrix);

  const group = svg.append('g')
    .selectAll('g')
    .data(chords.groups)
    .join('g');

  function onMouseOver(i) {
    group
      .filter((d) => { return (d.index !== i.index); })
      .style('opacity', 0.5);

    svg.selectAll('.chord')
      .filter((d) => d.source.index !== i.index)
      .style('opacity', 0.1);
  }

  function onMouseOut() {
    group.style('opacity', 1);
    svg.selectAll('.chord')
      .style('opacity', 1);
  }

  group.append('path')
    .attr('fill', (d) => colors[d.index])
    .attr('stroke', (d) => colors[d.index])
    .attr('d', arc)
    .on('mouseover', (_, i) => onMouseOver(i))
    .on('mouseout', onMouseOut);

  group.append('text')
    .each((d) => { d.angle = (d.startAngle + d.endAngle) / 2; })
    .attr('dy', '.35em')
    .attr('transform', (d) => `
    rotate(${((d.angle * 180) / Math.PI - 90)})
    translate(${innerRadius + 26})
    ${d.angle > Math.PI ? 'rotate(180)' : ''}
  `)
    .attr('text-anchor', (d) => (d.angle > Math.PI ? 'end' : null))
    .text((d) => labels[d.index])
    .on('mouseover', (_, i) => onMouseOver(i))
    .on('mouseout', onMouseOut);

  svg.append('g')
    .attr('fill-opacity', 0.8)
    .selectAll('path')
    .data(chords)
    .join('path')
    .attr('class', 'chord')
    .attr('stroke', (d) => d3.rgb(colors[d.source.index]).darker())
    .attr('fill', (d) => colors[d.source.index])
    .attr('d', ribbon)
    .on('mouseover', (_, i) => onMouseOver(i.source))
    .on('mouseout', onMouseOut);
};

export { loadChord, loadChordX };
