/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import * as d3 from 'd3';

const appendData = (chartDetails, col, filename) => {
  const parseDate = d3.timeParse('%Y-%m-%d %H:%M:%S%Z'); // 2020-05-25 00:00:00-04:00
  const formatDate = d3.timeFormat('%b%d');
  const formatDateWithHr = d3.timeFormat('%b%d %H%p');

  const {
    svg, margin, height, width, x, y,
  } = chartDetails;

  const area = d3
    .area()
    .x((d) => { return x(d.date); })
    .y0(height)
    .y1((d) => { return y(d.dataCol); });

  const valueline = d3
    .line()
    .x((d) => { return x(d.date); })
    .y((d) => { return y(d.dataCol); });

  svg.selectAll('path.area').remove();
  svg.selectAll('path.line').remove();
  svg.selectAll('.title').remove();

  d3.csv(filename).then((data) => {
    // Convert all data objs. into correct D3 format
    data.forEach((d) => {
      d.date = parseDate(d.Timestamp);
      d.dataCol = Number(d[col]);
    });

    // Update domain, range accordingly.
    x.domain(
      d3.extent(data, (d) => { return d.date; }),
    );
    y.domain([
      d3.min(data, (d) => { return d.dataCol; }) - 10,
      d3.max(data, (d) => { return d.dataCol; }),
    ]);

    // Then up
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

    svg
      .append('text')
      .attr('class', 'title')
      .attr('x', width / 2)
      .attr('y', 0 - margin.top / 2)
      .attr('text-anchor', 'middle')
      .text(`${col} Over Time`);

    const focus = svg
      .append('g')
      .attr('class', 'focus')
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

    function mouseMove(event) {
      const bisect = d3.bisector((d) => d.date).left;
      const x0 = x.invert(d3.pointer(event, this)[0]);
      const i = bisect(data, x0, 1);
      const d0 = data[i - 1];
      const d1 = data[i];
      const d = x0 - d0.date > d1.date - x0 ? d1 : d0;

      focus
        .select('circle.y')
        .attr('transform', `translate(${x(d.date)},${y(d.dataCol)})`);

      focus
        .select('text.y1')
        .attr('transform', `translate(${x(d.date)},${y(d.dataCol)})`)
        .text(`${d.dataCol} ${col}`);

      focus
        .select('text.y2')
        .attr('transform', `translate(${x(d.date)},${y(d.dataCol)})`)
        .text(`${d.dataCol} ${col}`);

      focus
        .select('text.y3')
        .attr('transform', `translate(${x(d.date)},${y(d.dataCol)})`)
        .text(formatDateWithHr(d.date));

      focus
        .select('text.y4')
        .attr('transform', `translate(${x(d.date)},${y(d.dataCol)})`)
        .text(formatDateWithHr(d.date));

      focus
        .select('.x')
        .attr('transform', `translate(${x(d.date)},${y(d.dataCol)})`)
        .attr('y2', height - y(d.dataCol));

      focus
        .select('.y')
        .attr('transform', `translate(${width * -1},${y(d.dataCol)})`)
        .attr('x2', width + width);
    }

    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mouseover', () => {
        focus.style('display', null);
      })
      .on('mouseout', () => {
        focus.style('display', 'none');
      })
      .on('touchmove mousemove', mouseMove);
  });
};

export { appendData };
