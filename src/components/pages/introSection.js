/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';

const introText = 'The following website is a summary of research conducted on the surge of #BLM usage in the aftermath of George Floyd’s murder on May 25th, 2020.';

const introText2 = `In the wake of Floyd's death, millions of people protested in support of Black Lives Matter, 
and millions more texted, tweeted, and shared in support of the movement. At a time in the pandemic when most of our
social lives were happening online, platforms like Twitter were a crucial organizing ground.
`;

const introText3 = 'In this website, I seek to contextualize and understand how and why this event was such a powerful moment for organizing, specifially by looking at the eponymous hashtag #BlackLivesMatter on Twitter';

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
      <p>{introText2}</p>
      <p>{introText3}</p>
      <Link to="/lit" className="next">NEXT: Why Hashtags?</Link>
    </div>
  );
};

export default IntroSection;
