/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
/* eslint-disable function-paren-newline */
import * as d3 from 'd3';
import { dNodes, dLinks } from '../../datasets/default_network';

const circRadius = 5;

const handleClick = (e, i_, simulation, svg) => {
  if (e.defaultPrevented) return; // if dragged, ignore this!
  console.log(e, i_);
  if (e.shiftKey) {
    deleteNode(i_.index, simulation, svg);
  } else {
    addChild(i_.index, simulation, svg);
  }
};

const drag = (simulation, svg) => {
  const dragstarted = (e, d) => {
    const startNode = svg.selectAll('g.node').filter((d_) => d_.id === d.id);
    startNode.select('circle').style('fill', 'blue');
    startNode
      .append('line')
      .attr('class', 'newLink')
      .attr('stroke', 'blue')
      .attr('x1', d.x)
      .attr('y1', d.y)
      .attr('x2', d.x)
      .attr('y2', d.y);
  };
  const dragged = (e, d) => {
    const startNode = svg.selectAll('g.node').filter((d_) => d_.id === d.id);
    startNode.select('.newLink')
      .attr('x2', e.x)
      .attr('y2', e.y);
  };
  const dragended = (e, d) => {
    const startNode = svg.selectAll('g.node').filter((d_) => d_.id === d.id);
    const endNode = svg.selectAll('g.node').filter(
      (d_) => (
        ((d_.x - e.x) ** 2 + (d_.y - e.y) ** 2) ** 0.5
      ) < circRadius,
    );

    const stIdx = startNode.data()[0].index;
    if (!endNode.empty()) {
      const endIdx = endNode.data()[0].index;
      if (endIdx !== stIdx) {
        addEdge(stIdx, endIdx, simulation, svg);
      }
    }

    startNode.select('circle').style('fill', ' black');
    startNode.select('.newLink').remove();
  };
  return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
};

const renderNetwork = (edges, nodes, simulation, svg) => {
  simulation.force('link').links(edges); // and this the list of links
  simulation.nodes(nodes);

  console.log(nodes, edges);

  svg.selectAll('line.link')
    .data(edges, (d) => `${d.source.id}-${d.target.id}`)
    .enter()
    .insert('line', 'g.node')
    .attr('class', 'link')
    .style('stroke', 'black');
  const nodeEnter = svg.selectAll('g.node')
    .data(nodes, (d) => d.id)
    .enter()
    .append('g')
    .attr('class', 'node')
    .call(drag(simulation, svg))
    .on('click', (e, i_) => {
      handleClick(e, i_, simulation, svg);
    });
  nodeEnter.append('circle')
    .attr('r', circRadius)
    .style('fill', 'black');
  nodeEnter.append('title')
    .text((d) => d.id);

  // Initialize for contagion model later :)!
  nodeEnter.data().forEach((n) => { n.adopted = false; n.nbrAdopters = 0; });

  simulation.alpha(0.5); // alpha="temperature", continues to decrease, so if you don't set back up, it'll eventually slow to no updating.
  simulation.restart();
};

// https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
const downloadObjectAsJson = (exportObj, exportName) => {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportObj))}`;
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', `${exportName}.json`);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

/** Functions for Modifying the Graph */
/* Each of the following 3 functions alters the nodes/edges list, then calls renderNetwork() */
const deleteNode = (nodeIndex, simulation, svg) => {
  simulation.stop();
  console.log('STOPPING!');

  const nodes = simulation.nodes();
  const edges = simulation.force('link').links();

  // UNCOMMENT TO DOWNLAOD:
  // downloadObjectAsJson({ nodes, links: edges }, 'default_network');

  const remainingNodes = nodes.filter((d) => d.index !== nodeIndex);
  const remainingEdges = edges.filter((d) => ((d.source.index !== nodeIndex) && (d.target.index !== nodeIndex)));

  d3.selectAll('g.node')
    .data(remainingNodes, (d) => d.id)
    .exit()
    .remove();
  d3.selectAll('line.link')
    .data(remainingEdges, (d) => `${d.source.id}-${d.target.id}`)
    .exit()
    .remove();

  renderNetwork(remainingEdges, remainingNodes, simulation, svg);
};

const addEdge = (srcIndex, targetIndex, simulation, svg) => {
  console.log(srcIndex, targetIndex);
  console.log(simulation);
  console.log(svg);

  simulation.stop();

  const nodes = simulation.nodes();
  const edges = simulation.force('link').links();

  edges.push({ source: nodes[srcIndex], target: nodes[targetIndex] });

  renderNetwork(edges, nodes, simulation, svg);
};

const addChild = (srcIndex, simulation, svg) => {
  simulation.stop();

  const nodes = simulation.nodes();
  const edges = simulation.force('link').links();

  nodes.push({ id: nodes.length });
  edges.push({ source: nodes[srcIndex], target: nodes[nodes.length - 1] });

  renderNetwork(edges, nodes, simulation, svg);
};

/** Function for Initializing the Graph */
const loadNetwork = (nId) => {
  // set the dimensions and margins of the graph
  const margin = {
    top: 10, right: 30, bottom: 30, left: 40,
  };
  const width = 1000;
  const height = 500;

  // Remove old svg, if any.
  d3.select(`#${nId}`).select('svg').remove();

  // append the svg object to the body of the page
  const svg = d3.select(`#${nId}`)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .append('g')
    .attr('transform',
      `translate(${margin.left},${margin.top})`);

  /*
  const nodes = [{ id: 0 }, { id: 1 }, { id: 2 }];
  const edges = [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
    { source: 2, target: 0 },
  ]; */

  const nodes = dNodes;
  const edges = dLinks;

  // Let's list the force we wanna apply on the network
  const simulation = d3.forceSimulation() // Force algorithm is applied to data.nodes
    .force('link', d3.forceLink())
    .force('charge', d3.forceManyBody().strength(-80)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
    .force('center', d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
    .nodes(nodes)
    .on('tick', () => ticked(svg));

  renderNetwork(edges, nodes, simulation, svg);

  return {
    svg,
  };
};

// This function is run at each iteration of the force algorithm, updating the nodes position.
const ticked = (svg) => {
  const link = svg
    .selectAll('line.link');
  const node = svg
    .selectAll('g.node');

  link
    .attr('x1', (d) => { return d.source.x; })
    .attr('y1', (d) => { return d.source.y; })
    .attr('x2', (d) => { return d.target.x; })
    .attr('y2', (d) => { return d.target.y; });
  node.selectAll('circle')
    .attr('cx', (d) => { return d.x + circRadius / 2; })
    .attr('cy', (d) => { return d.y - circRadius / 2; });
};

export { loadNetwork };
