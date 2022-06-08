/* eslint-disable no-param-reassign */
import * as d3 from 'd3';

const loadChart = (chartSelector, yAxisLabel, heightRatio) => {
  const margin = {
    top: 40, right: 80, bottom: 60, left: 80,
  };
  const width = 960 - margin.left - margin.right;
  const height = heightRatio * 960 - margin.top - margin.bottom;

  const formatMonth = d3.timeFormat('%b%d');

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const svg = d3
    .select(chartSelector)
    .insert('svg', ':first-child')
    .attr(
      'viewBox',
      `0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom}`,
    )
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  svg
    .append('g')
    .attr('class', 'x axis')
    .attr('aria-label', 'x axis')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(formatMonth));

  svg
    .append('g')
    .attr('class', 'y axis')
    .attr('aria-label', 'y axis')
    .call(d3.axisLeft(y));

  svg
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - height / 2)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text(yAxisLabel);

  svg
    .append('text')
    .attr('class', 'subtitle')
    .attr('x', 0)
    .attr('y', height + 50)
    .text('Source: Twitter API');

  return {
    svg, margin, height, width, x, y,
  };
};

const appendData = (chartDetails, cols, filename, title, colors) => {
  const parseDate = d3.timeParse('%Y-%m-%d %H:%M:%S%Z'); // 2020-05-25 00:00:00-04:00
  const formatDate = d3.timeFormat('%b%d');
  const formatDateWithHr = d3.timeFormat('%b%d %H%p');

  const {
    svg, margin, height, width, x, y,
  } = chartDetails;

  // accessibility
  svg.attr('aria_label', title);

  svg.selectAll('path.area').remove();
  svg.selectAll('path.line').remove();
  svg.selectAll('.title').remove();
  svg.selectAll('desc').remove();

  d3.csv(filename).then((data) => {
    // Convert all data objs. into correct D3 format
    let dataMin,
      dataMax;

    data.forEach((d) => {
      d.date = parseDate(d.Timestamp);
      cols.forEach((col) => {
        d[col] = Number(d[col]);
        if (!dataMin || d[col] < dataMin) {
          dataMin = d[col];
        }
        if (!dataMax || d[col] > dataMax) {
          dataMax = d[col];
        }
      });
    });

    console.log(data);

    // Update domain, range accordingly.
    x.domain(
      d3.extent(data, (d) => { return d.date; }),
    );
    y.domain([
      dataMin,
      dataMax,
    ]);

    // Then slide in the new axis..
    svg
      .select('.x.axis')
      .transition()
      .duration(750)
      .call(d3.axisBottom(x).tickFormat(formatDate));
    svg
      .select('.y.axis')
      .transition()
      .duration(750)
      .call(d3.axisLeft(y));

    // Area path!
    cols.forEach((col) => {
      const area = d3
        .area()
        .x((d) => { return x(d.date); })
        .y0(height)
        .y1((d) => { return y(d[col]); });

      const valueline = d3
        .line()
        .x((d) => { return x(d.date); })
        .y((d) => { return y(d[col]); });

      svg
        .append('path')
        .data([data])
        .attr('class', 'area')
        .attr('d', area)
        .attr('transform', 'translate(0,300)')
        .transition()
        .duration(1000)
        .attr('transform', 'translate(0,0)');

      const linePath = svg
        .append('path')
        .data([data])
        .attr('class', 'line')
        .attr('d', valueline);

      const pathLength = linePath.node().getTotalLength();
      linePath
        .attr('stroke-dasharray', pathLength)
        .attr('stroke-dashoffset', pathLength)
        .attr('stroke-width', 3)
        .transition()
        .duration(1000)
        .attr('stroke-width', 0)
        .attr('stroke-dashoffset', 0);
    });

    svg
      .append('text')
      .attr('class', 'title')
      .attr('x', width / 2)
      .attr('y', 0 - margin.top / 2)
      .attr('text-anchor', 'middle')
      .text(title);

    const foci = [];

    cols.forEach((col, i) => {
      const focus = svg
        .append('g')
        .attr('class', `focus_${i}`)
        .style('display', 'none');

      focus
        .append('line')
        .attr('class', 'x')
        .style('stroke-dasharray', '3,3')
        .style('opacity', 0.5)
        .attr('y1', 0)
        .attr('y2', height);

      focus
        .append('line')
        .attr('class', 'y')
        .style('stroke-dasharray', '3,3')
        .style('opacity', 0.5)
        .attr('x1', width)
        .attr('x2', width);

      focus
        .append('circle')
        .attr('class', 'y')
        .style('fill', 'none')
        .attr('r', 4);

      focus.append('text').attr('class', 'y1').attr('dx', 8).attr('dy', '-.3em');
      focus.append('text').attr('class', 'y2').attr('dx', 8).attr('dy', '-.3em');

      focus.append('text').attr('class', 'y3').attr('dx', 8).attr('dy', '1em');
      focus.append('text').attr('class', 'y4').attr('dx', 8).attr('dy', '1em');

      foci.push(focus);
    });

    function mouseMove(event) {
      const bisect = d3.bisector((d) => d.date).left;
      const x0 = x.invert(d3.pointer(event, this)[0]);
      const i = bisect(data, x0, 1);
      const d0 = data[i - 1];
      const d1 = data[i];
      const d = x0 - d0.date > d1.date - x0 ? d1 : d0;

      cols.forEach((col, idx) => {
        foci[idx]
          .select('circle.y')
          .attr('transform', `translate(${x(d.date)},${y(d[col])})`);

        if (cols.length === 1) {
          foci[idx]
            .select('text.y1')
            .style('background-color', 'white')
            .attr('transform', `translate(${x(d.date)},${y(d[col])})`)
            .text(`${d[col]} ${col}`);

          foci[idx]
            .select('text.y2')
            .style('background-color', 'white')
            .attr('transform', `translate(${x(d.date)},${y(d[col])})`)
            .text(`${d[col]} ${col}`);

          foci[idx]
            .select('text.y3')
            .style('background-color', 'white')
            .attr('transform', `translate(${x(d.date)},${y(d[col])})`)
            .text(formatDateWithHr(d.date));

          foci[idx]
            .select('text.y4')
            .attr('transform', `translate(${x(d.date)},${y(d[col])})`)
            .style('background-color', 'white')
            .text(formatDateWithHr(d.date));
        }

        foci[idx]
          .select('.x')
          .attr('transform', `translate(${x(d.date)},${y(d[col])})`)
          .attr('y2', height - y(d[col]));

        foci[idx]
          .select('.y')
          .attr('transform', `translate(${width * -1},${y(d[col])})`)
          .attr('x2', width + width);
      });
    }

    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mouseover', () => {
        cols.forEach((col, idx) => {
          foci[idx].style('display', null);
        });
      })
      .on('mouseout', () => {
        cols.forEach((col, idx) => {
          foci[idx].style('display', 'none');
        });
      })
      .on('touchmove mousemove', mouseMove);

    svg
      .append('desc')
      .text('Hi!');
  });
};

export { appendData, loadChart };
