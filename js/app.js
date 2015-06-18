import React  from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import PopularPageHandler from './components/PopularPage.js';
import VotePageHandler    from './components/VotePage.js';
import AddPageHandler     from './components/AddPage.js';
import auth from './auth';

let App = React.createClass({
    getInitialState() {
        return {authData: null};
    },
    clickLogin (e) {
      var self = this;
      auth.login(function(e, authData) {
        self.setState({authData: authData});
      });
    },
    render() {
        return (<div>
                  <nav className="teal">
                    <div className="nav-wrapper">
                      <a href="#" className="brand-logo">Ranking</a>
                      { !this.state.authData ?  null : <ul id="nav-mobile" className="right hide-on-med-and-down">
                                                         <li><Link to="addPage" role="button">Add List</Link></li>
                                                       </ul>                                      
                      }
                      { !!this.state.authData ? null :  <ul id="nav-mobile" className="right hide-on-med-and-down">
                                                          <li><Link to="addPage" role="button">Add List</Link></li>
                                                        </ul> 
                      }
                    </div>
                  </nav>
                  <RouteHandler/>
                </div>);
    }
});

let routes = (
  <Route name="app" path="/" handler={App}>

    <Route name="popularPage" path="/popularPage" handler={PopularPageHandler}>
      {/*TODO: need to figure out why it cannot work*/}
      {/*<Route name="votePage" path=":itemName" handler={VotePageHandler} />*/}
    </Route>
    <Route name="votePage" path="/popularPage/:itemName" handler={VotePageHandler} />
    <Route name="addPage" path="/addPage/" handler={AddPageHandler} />

    <DefaultRoute  handler={PopularPageHandler}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
