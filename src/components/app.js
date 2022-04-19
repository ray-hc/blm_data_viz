import '../style.scss';

import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import IntroSection from './introSection';
import FindingsSection from './findingsSection';
import FallBack from './fallback';
import Nav from './nav';

const App = (props) => {
  return (
    <Router>
      <>
        <div className="titleSection">
          <div>
            <h1>#Black<wbr />Lives<wbr />Matter: A Network Analysis</h1>
            <div className="divider" />
            <Nav />
          </div>
        </div>
        <div className="mainSection">
          <Switch>
            <Route exact path="/" component={IntroSection} />
            <Route exact path="/findings" component={FindingsSection} />
            <Route component={FallBack} />
          </Switch>
        </div>
      </>
    </Router>
  );
};

export default App;
