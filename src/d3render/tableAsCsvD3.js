/* eslint-disable no-param-reassign */
import * as d3 from 'd3';

const tabulate = (data, tableId) => {
  const table = d3.select(`#${tableId}`).append('table');
  const thead = table.append('thead');
  const tbody = table.append('tbody');

  // const format = d3.format('.2s');

  thead.append('tr')
    .selectAll('th')
    .data(data.columns)
    .enter()
    .append('th')
    .text((d) => { return d; });

  const rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .append('tr');

  rows.selectAll('td')
    .data((row) => {
      return data.columns.map((column) => {
        return { column, value: row[column] };
      });
    })
    .enter()
    .append('td')
    .text((d) => { return d.value; });

  return table;
};

const loadTable = (csvFilename, tableId) => {
  d3.csv(csvFilename).then((data) => {
    // Screen readers can only handle so much data!
    if (data.length > 15) {
      const divBy = Math.floor(data.length / 15);
      const thinnedData = data.filter((e, i) => i % divBy === 0);
      if (thinnedData[thinnedData.length - 1] !== data[data.length - 1]) {
        thinnedData.push(data[data.length - 1]);
      }
      thinnedData.columns = data.columns;
      data = thinnedData;
    }
    // now plot data
    console.log(data);
    tabulate(data, tableId);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { loadTable };
