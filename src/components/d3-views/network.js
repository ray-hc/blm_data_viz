/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
// import { loadChordX } from '../../d3render/chordD3';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { runModel, selectStartNodes } from '../../d3render/contagionD3';
import { loadNetwork } from '../../d3render/networkD3';

const STAGE = {
  SELECT_NODES: 0,
  RUN_MODEL: 1,
  STOP_MODEL: 2,
  START_OVER: 3,
};

const STAGE_BUTTON = {
  0: '2. Select Seeds',
  1: '3. Run Model',
  2: '4. Stop Model',
  3: 'Start Over',
};

const Network = (props) => {
  const [modelType, setModelType] = useState('Simple');
  const [prob, setProb] = useState(0.05);
  const [threshold, setThreshold] = useState(1);
  const [stage, setStage] = useState(STAGE.SELECT_NODES);
  const [modelRunning, setModelRunning] = useState(null);
  const [thisSVG, setSVG] = useState({});

  const models = [
    { name: 'Simple', value: 'Simple' },
    { name: 'Complex', value: 'Complex' },
  ];

  // Mount Effect
  useEffect(() => {
    const { svg } = loadNetwork('network');
    setSVG(svg);
    console.log('Mounted D3');
  }, []);

  // Unmount Effect -- will run callback on destroy.
  useEffect(() => {
    return () => {
      console.log('Cleaned up D3!');
    };
  }, []);

  const simpleOptions = () => {
    return (
      <div>
        <input disabled={stage === STAGE.STOP_MODEL} type="range" min="0" max="1" step="0.05" value={prob} onChange={(e) => setProb(e.target.value)} />
        <div>{ `Adoption Probability: ${prob}` }</div>
      </div>
    );
  };

  const complexOptions = () => {
    return (
      <div>
        <input disabled={stage === STAGE.STOP_MODEL} type="range" min="0" max="1" step="0.05" value={prob} onChange={(e) => setProb(e.target.value)} />
        <div>{ `Max Adoption Probability: ${prob}` }</div>
        <input disabled={stage === STAGE.STOP_MODEL} type="range" min="0" max="10" step="1" value={threshold} onChange={(e) => setThreshold(e.target.value)} />
        <div>{ `Threshold: ${threshold}` }</div>
      </div>
    );
  };

  const callStage = () => {
    if (stage === STAGE.SELECT_NODES) {
      selectStartNodes(thisSVG);
      setStage(STAGE.RUN_MODEL);
    } else if (stage === STAGE.RUN_MODEL) {
      let mModelRunning = null;
      if (modelType === 'Simple') {
        mModelRunning = runModel(thisSVG, true, prob, threshold);
      } else {
        mModelRunning = runModel(thisSVG, false, prob, threshold);
      }
      setStage(STAGE.STOP_MODEL);
      console.log(mModelRunning);
      // clearInterval(mModelRunning);
      setModelRunning(mModelRunning);
    } else if (stage === STAGE.STOP_MODEL) {
      clearInterval(modelRunning);
      setStage(STAGE.START_OVER);
    } else {
      const { svg } = loadNetwork('network');
      setSVG(svg);
      setStage(STAGE.SELECT_NODES);
    }
  };

  const helperText = (stage_) => {
    if (stage_ === STAGE.SELECT_NODES) {
      return ('Modify the network, then...');
    } else if (stage_ === STAGE.RUN_MODEL) {
      return ('Now choose the nodes to start as "infected".');
    } else {
      return ('');
    }
  };

  return (
    <>
      <div id="network" className="svg" />
      <div id="networkParams">
        <ButtonGroup>
          {models.map((radio, idx) => (
            <ToggleButton
              disabled={stage === STAGE.STOP_MODEL}
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              name="radio"
              value={radio.value}
              checked={modelType === radio.value}
              onChange={(e) => setModelType(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        { (modelType === 'Simple') ? simpleOptions() : complexOptions()}
        <p>
          {helperText(stage) }
        </p>
        <Button onClick={callStage}>
          { STAGE_BUTTON[stage]}
        </Button>

      </div>
    </>
  );
};

export default Network;
