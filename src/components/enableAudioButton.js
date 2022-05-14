/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import * as Tone from 'tone';

const EnableAudioButton = (props) => {
  const enable = () => {
    Tone.start();
    console.log('audio is ready');
  };

  return (
    <button type="button" onClick={enable}>Enable Audio</button>
  );
};

export default EnableAudioButton;
