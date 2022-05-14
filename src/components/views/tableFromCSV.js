/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { loadTable } from '../../d3render/tableAsCsvD3';

/*
Adapted from https://github.com/jukuznets/d3-line-chart/tree/gh-pages
to fit React, ES6.
*/

const TableFromCSV = (props) => {
  const {
    csvFilename,
  } = props;

  // Convert csv filename to an ID for the table:
  const csvFileParts = csvFilename.split('/');
  const csvTitleAndExt = csvFileParts[csvFileParts.length - 1];
  const [csvTitle] = csvTitleAndExt.split('.');
  const tableId = `${csvTitle}_table`;

  // Mount Effect
  useEffect(() => {
    loadTable(csvFilename, tableId);
  }, []);

  return (
    <div id={tableId} />
  );
};

export default TableFromCSV;
