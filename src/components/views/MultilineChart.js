/** MultilineChart.js */
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// This HELLO WORLD was copied from here: https://codesandbox.io/s/5nxwo

const MultilineChart = ({ data = [], dimensions = {} }) => {
  const svgRef = useRef(null);
  const { width, height, margin = {} } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  const BUFFER = 50;

  useEffect(() => {
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].items, (d) => d.date))
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data[0].items, (d) => d.value) - BUFFER,
        d3.max(data[0].items, (d) => d.value) + BUFFER,
      ])
      .range([height, 0]);

    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll('*').remove(); // Clear svg content before adding new elements
    const svg = svgEl
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add X grid lines with labels
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickSize(-height + margin.bottom);
    const xAxisGroup = svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);
    xAxisGroup.select('.domain').remove();
    xAxisGroup.selectAll('line').attr('stroke', 'rgba(255, 255, 255, 0.2)');
    xAxisGroup
      .selectAll('text')
      .attr('font-size', '0.75rem');
    // Add Y grid lines with labels
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickSize(-width)
      .tickFormat((val) => `${val}%`);
    const yAxisGroup = svg.append('g').call(yAxis);
    yAxisGroup.select('.domain').remove();
    yAxisGroup.selectAll('line').attr('stroke', 'rgba(100, 100, 100, 0.2)');
    yAxisGroup
      .selectAll('text')
      .attr('font-size', '0.75rem');
    // Draw the lines
    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value));

    svg
      .selectAll('.line')
      .data(data)
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', 3)
      .attr('d', (d) => line(d.items));
  }, [data]);

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export default MultilineChart;
