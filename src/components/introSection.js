/* eslint-disable max-len */
import React from 'react';

const introText = `
  The following website is a summary of research conducted on the surge of #BLM usage in the aftermath of George Floyd’s death on May 25th, 2020.
  [ More about the project ].`;

const acknowledgeText = `Big data can sometimes feel abstract and impersonal. 
  It is important to recognize that the data-points visualized in this project 
  represent real people, advocating fro change in the aftermath of a horrific instance of police brutality.`;

const acknowledgeTextMore = 'If you would like to honor George Floyd’s memory, his family has suggested X, Y, Z.';

const IntroSection = (props) => {
  return (
    <div>
      <h1>Introduction</h1>
      <p>{introText}</p>
      <p>
        <img
          id="floydPhoto"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Wandbild_Portrait_George_Floyd_von_Eme_Street_Art_im_Mauerpark_%28Berlin%29.jpg/1200px-Wandbild_Portrait_George_Floyd_von_Eme_Street_Art_im_Mauerpark_%28Berlin%29.jpg"
          alt="Wandbild Portrait George Floyd von Eme Street Art im Mauerpark (Berlin)"
        />
        <br />
        (<a href="https://commons.wikimedia.org/w/index.php?curid=90836668">photo source</a>)
      </p>
      <p>{acknowledgeText}</p>
      <p>{acknowledgeTextMore}</p>
    </div>
  );
};

export default IntroSection;
