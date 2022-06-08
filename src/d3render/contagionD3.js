/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
const selectStartNodes = (svg) => {
  const nodes = svg.selectAll('g.node');
  nodes.on('click', (e, d) => {
    console.log(e, d);
    const node = svg.selectAll('g.node').filter((d_) => d_.id === d.id);
    node.select('circle').style('fill', 'yellow');
    d.adopted = true;
  });
};

const RE_EXPOSE_RT = 0.1;

const simpleInfect = (p, k0, exposures, nbrAdopters) => {
  return 1 - (1 - p) ** exposures;
};

const pK = (k, k0, pLo, pHi, g) => {
  let out = (pHi - pLo) / (1 + Math.exp(-g * (k - k0)));
  out += pLo;
  return out;
};

const complexInfect = (p, k0, exposures, nbrAdopters) => {
  const _pK = pK(nbrAdopters, k0, 0.01, p, 1);
  return 1 - (1 - _pK) ** exposures;
};

const runModel = (svg, isSimple, p, k0) => {
  let nodes = svg.selectAll('g.node');
  let edges = svg.selectAll('line.link').data();

  const probFunc = (isSimple ? simpleInfect : complexInfect);

  let susceptiblePop = nodes.filter((d) => !d.adopted);
  let tStep = 0;

  const modelRunning = setInterval(() => {
    if (susceptiblePop.empty()) {
      clearInterval(modelRunning);
    }

    // Update in case user has changed
    nodes = svg.selectAll('g.node');
    edges = svg.selectAll('line.link');

    const infectedPop = nodes.filter((d) => d.adopted);
    susceptiblePop = nodes.filter((d) => !d.adopted);
    susceptiblePop.selectAll('circle').style('fill', 'black');
    infectedPop.selectAll('circle').style('fill', 'orange');

    tStep += 1;
    console.log('time', tStep);

    susceptiblePop.data().forEach(
      (node) => {
        let myEdges = edges.data().filter((e) => e.target.index === node.index);
        myEdges = myEdges.filter((e) => nodes.data()[e.source.index].adopted);
        const nbrAdopters = myEdges.length;

        const newNbrAdopters = nbrAdopters - node.nbrAdopters;
        let exposures = newNbrAdopters;
        for (let i = 0; i < node.nbrAdopters; i += 1) {
          if (Math.random() < RE_EXPOSE_RT) {
            exposures += 1;
          }
        }

        const prob = probFunc(p, k0, exposures, nbrAdopters);
        console.log('nbrs', nbrAdopters, 'new', newNbrAdopters, 'exp', exposures, 'prob', prob);

        if (Math.random() <= prob) {
          node.adopted = true;
        }
        console.log('Adopted', node.adopted);
        node.nbrAdopters = nbrAdopters;
      },

    );
  }, 1000);

  return modelRunning;
};

export { runModel, selectStartNodes };
// QUote about everything being good or bad.
