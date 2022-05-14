/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { playSound, stopSound } from '../d3render/tonalChartD3';

const MusicScale = (props) => {
  const { dMin, dMax } = props;
  const dRange = dMax - dMin;

  const scaleVals = [];
  for (let i = 0; i <= 1; i += 0.25) {
    scaleVals.push(dMin + i * dRange);
  }

  const getButtons = () => {
    const buttons = [];
    scaleVals.forEach((sVal) => {
      buttons.push(
        <button type="button"
          onClick={
            () => { playSound(sVal, dMin, dMax); setTimeout(stopSound, 2000); }
          }
        >{sVal} Adopters
        </button>,
      );
    });
    return buttons;
  };

  return (
    <div className="sound-scale">
      Sound Scale:
      {getButtons()}
    </div>
  );
};

export default MusicScale;
