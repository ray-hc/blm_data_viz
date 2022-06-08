import '../style.scss';

import React, { useEffect } from 'react';
import {
  useLocation,
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import IntroSection from './pages/introSection';
import FindingsASection from './pages/findingsASection';
import FindingsBSection from './pages/findingsBSection';
import FindingsCSection from './pages/findingsCSection';
import FallBack from './fallback';
import Nav from './nav';
import SimsSection from './pages/simsSection';
import LitSection from './pages/litSection';
import EnableAudioButton from './enableAudioButton';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <></>;
};

const App = (props) => {
  return (
    <Router>
      <>
        <ScrollToTop />
        <div className="titleSection">
          <div>
            <h1>#BLM: A Network Analysis</h1>
            <div className="divider" />
            <Nav />
            <EnableAudioButton />
          </div>
        </div>
        <div className="mainSection">
          <Switch>
            <Route exact path="/" component={IntroSection} />
            <Route exact path="/lit" component={LitSection} />
            <Route exact path="/findingsA" component={FindingsASection} />
            <Route exact path="/findingsB" component={FindingsBSection} />
            <Route exact path="/findingsC" component={FindingsCSection} />
            <Route exact path="/simulations" component={SimsSection} />
            <Route component={FallBack} />
          </Switch>
        </div>
      </>
    </Router>
  );
};

export default App;
