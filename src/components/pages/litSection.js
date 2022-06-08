/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';

const LitSection = (props) => {
  return (
    <div>
      <h1>Who Cares About Hashtags?</h1>
      <p>Sometimes praised for being the future of democracy,
        sometimes derided for requiring <a href="http://www.newyorker.com/magazine/2010/10/04/small-change-malcolm-gladwell">little effort</a>,
        online engagement is increasingly becoming a major pillar of modern social movements.
      </p>
      <p>
        In the past, movements have solved the <a href="https://en.wikipedia.org/wiki/Collective_action_problem">collective action</a> problem
        by fostering a shared identity and strong ties between participants. But technology has radically changed the cost/benefit calculus
        for engagement. Now, organizing a protest or signing a petition is just a few phone taps away.
      </p>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/2013_Taksim_Gezi_Park_protests%2C_Protests_at_Gezi_Park_on_3rd_June_2013.JPG/1600px-2013_Taksim_Gezi_Park_protests%2C_Protests_at_Gezi_Park_on_3rd_June_2013.JPG?20130603161454" alt="Gezi Park" />
      <div className="blockQtCap">Gezi Park Protests, another movement organized online</div>
      <p>
        <br />
        In the 21st century, we've seen the rise of a new form of engagement: <a href="https://www.tandfonline.com/doi/abs/10.1080/1369118X.2012.670661">connective action</a>, where
        technology allows many individuals
        across weak-tie networks to support movements while requiring little effort,
        and providing individuals with a feeling of self-fulfillment.
      </p><p>Whereas collective action is governed by the formal structure of the movement,
        connective action is ruled by the social network.
        <br />
          </p>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Examples of Connective Action</Accordion.Header>
          <Accordion.Body>
            <p>
              The role of personal identity in connective action is what often causes it to be described as performative. When someone posts a black square for
              #BlackOutTuesday, they are not only supporting a movement but also signalling their own social position. These individuals are engaging in connective action. Connective action can broaden the scope of a
              movement by allowing everyday individuals to <a href="https://doi.org/10.1080/01419870.2017.1334931">shape messaging</a>.
            </p>
            <p>
              For example, when people started appending #SayHerName to #BlackLivesMatter in tweets,
              they were illuminating the specific ways police violence affects women.
            </p>
            <p>At the same time, the low-barrier nature of connective action exposes movements
              to appropriation, which is why gatekeeping often becomes a prominent feature of movements like Black Lives Matter.
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <p>
        <br />
        Many social movements today engage in both collective and connective action. The organizers behind the largest Black Lives Matter rallies were, undoubtebly,
        tapping into a collective identity, but Black Lives Matter would not have gone 'viral' as quickly as it did without the engagement of a much larger group of people.
      </p>
      <h1>So Why Do We Care?</h1>
      <p>
        Habermas defined the public sphere as the space within which a society's citizens could come together and debate the public good. When Habermas was alive, only citizens who controlled newspapers could engage in this sphere.
      </p>
      <p>Now, anyone can engage. As a form of "searchable talk", hashtags are generative of communities.
        #BlackLivesMatter provides a space whereby individuals can <a href="https://academic.oup.com/sf/article/99/4/1547/5866123">organize</a>,
        change the narrative about anti-Black violence, <a href="https://doi.org/10.1080/01419870.2017.1334931">shape movement messaging</a>, and display movement unity.
      </p>
      <p />
      <Link to="/findingsA" className="next">NEXT: Overall Trends</Link>
    </div>
  );
};

export default LitSection;
