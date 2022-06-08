/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { loadChordX } from '../../d3render/chordD3';

const Chord = (props) => {
  // Mount Effect
  useEffect(() => {
    loadChordX('chord');
    console.log('Mounted D3');
  }, []);

  // Unmount Effect -- will run callback on destroy.
  useEffect(() => {
    return () => {
      console.log('Cleaned up D3!');
    };
  }, []);

  return (
    <>
      <div id="chord" className="svg" />
    </>
  );
};

export default Chord;
