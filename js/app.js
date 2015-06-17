import React  from 'react';  
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import PopularPageHandler from './components/PopularPage.js';
import VotePageHandler    from './components/VotePage.js';



let App = React.createClass({  
  render() {
    return (
      <div className="nav">
        <Link to="app">Home</Link>
        <Link to="popularPage">PopularPage</Link>
        {/* this is the importTant part */}
        <RouteHandler/>
      </div>
    );
  }
});

let routes = (  
  <Route name="app" path="/" handler={App}>
    
    <Route name="popularPage" path="/popularPage" handler={PopularPageHandler}>
      {/*TODO: need to figure out why it cannot work*/}
      {/*<Route name="votePage" path=":itemName" handler={VotePageHandler} />*/}
    </Route>
    <Route name="votePage" path="/popularPage/:itemName" handler={VotePageHandler} />  
    
    <DefaultRoute  handler={PopularPageHandler}/>
  </Route>
);

Router.run(routes, function (Handler) {  
  React.render(<Handler/>, document.body);
});