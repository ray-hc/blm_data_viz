import * as Tone from 'tone';

const blmCrowd = new Tone.Player({
  url: 'https://www.raycrist.com/pics/blm_crowd.mp3',
  loop: true,
}).toDestination();

const stopSound = () => {
  Tone.Transport.stop();
  blmCrowd.stop();
};

const playSound = (dataVal, dMin, dMax) => {
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();

  const hzRange = 1200;
  const hzMin = 50;
  const volRange = 33;
  const volMin = 0;

  const dRange = (dMax - dMin);

  const hz = (((dataVal - dMin) * hzRange) / dRange) + hzMin;
  const vol = (((dataVal - dMin) * volRange) / dRange) + volMin;
  const volSub = -1 * (volRange - vol);

  console.log(hz);
  console.log(vol);

  synth.triggerAttackRelease(hz, '8n', Tone.now() + 1);
  // the loops start when the Transport is started
  Tone.Transport.start();

  Tone.loaded().then(() => {
    blmCrowd.volume.value = volSub;
    console.log(volSub);
    blmCrowd.start();
  });
};

// eslint-disable-next-line import/prefer-default-export
export { playSound, stopSound };
