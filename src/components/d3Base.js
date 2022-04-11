import React, { useEffect, useRef } from 'react';

const D3Base = (props) => {
  const d3Ref = useRef(null);

  // Mount Effect
  useEffect(() => {
    console.log('Mounted D3');
  }, []);

  // Unmount Effect -- will run callback on destroy.
  useEffect(() => {
    return () => {
      console.log('Cleaned up D3!');
    };
  }, []);

  return (
    <div>
      <div ref={d3Ref} id="my_div" />
    </div>
  );
};

export default D3Base;
