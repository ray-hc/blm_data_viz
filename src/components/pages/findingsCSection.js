/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';

const FindingsCSection = (props) => {
  return (
    <div>
      <h1>Contagion Simulations</h1>
      <div className="blockQt">"Socially, everything is inventions and imitations"</div>
      <p className="blockQtCap"> - Gabriel Tarde, famous 20th century sociologist</p>
      <p>At the most basic level, everything social has to either be created out of thin air, or passed from person to person.
        This basic insight has fueled a world of sociological research, centered around the paradigm of contagion.
      </p>
      <p>Social contagions can be anything -- thoughts, behaviors, or beliefs -- that can spread from person to person.</p>
      <p>There are 2 basic forms of social contagion -- simple and complex contagions.</p>
      <p>Simple contagions spread much like we're used to -- each time we're exposed to them, there's a chance we adopt. Catchphrases, snippets of advice, and gossip all might spread this way.</p>
      <p>On the other hand, some behaviors require social reinforcement before adopting -- either because they're risky or because we're trying to impress our peers or because they're only advantageous in numbers.</p>
      <p>These "complex" contagions exhibit a threshold-like probability curve:</p>
      <img src="https://www.raycrist.com/pics/complex.png" alt="complex-curve" />
      <p>
        I had theorized that whiter and more rural areas' adoption of #BlackLivesMatter would more closely resemble a complex contagion.
      </p>\
      <p>
        To test this, I developed three simulations: a simple contagion model, a complex contagion model, and a "reference model" which would represent what we'd expect to see in absence of online social contagion.
      </p>
      <p>The third property to consider in contagion research is the confounder: homophily. Homophily is the phenomena by which similiar people tend to cluster on a network. Similiar people also tend to adopt similiar behaviors. As a result, what sometimes looks like contagion on a network is actually just groups of similiar people responding to the same external stimulus.
      </p>
      <p>
        Most contagion research neglects the presence of homophily, so I sought to incorporate it into my study design, where I used "daily rate of news articles containing #BLM" to estimate external factors.
      </p>
      <img src="https://www.raycrist.com/pics/reference.png" alt="reference-curve" />
      <p>
        In fact, I found that the "reference model" (based on news articles) was extremely good at predicting user behavior over the entire study period (see the reference model's predictions vs. the actual adoption rate above), but models of contagion explained the first 48 hours.
        Thus, I argued the earliest phase of hashtag adoption may be especially important in spurring journalists to write news articles, fueling a circular process by which media broadcasts amplify diffusion processes,
        a process which was suggested in (Freelon et al. 2018).
        Given that media coverage helps shape the political agenda (Edwards and Wood 1999; Hilgartner and Bosk 1988),
        this suggests that one major benefit of online activism is in directing the public conversation.
      </p>
      <p>
        Within the first 48 hours, however, I found individuals from more diverse areas required less social reinforcement on Twitter (measured via exposures) than others to adopt the hashtag. Consider, for example, the variations in predicted adoptions between the Rur.White cluster (left) and Sub.Blacker cluster (right):
      </p>
      <img src="https://www.raycrist.com/pics/WhiterVsSubBlckr.png" alt="whiter-vs-blacker-areas-curve" />
      <p>
        The blue curve represents the model's predicted adoption rate, while the red curve represents the actual adoption rate. The Sub.Blacker cluster consistently adopted sooner than expected, while the Rur.White cluster adopted later.
      </p>
      <p>
        To gain some intuition about how different types of contagion spread, explore the Simulation Playground on the following page. While these simulations are simplified (do not include information about homophily, or break down nodes into clusters), they can demonstrate how social contagions spread across a network.
      </p>
      <Link to="/simulations" className="next">NEXT: Simulation Playground</Link>
    </div>
  );
};

export default FindingsCSection;
