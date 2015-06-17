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
        {/* FIXME navId is not work after integarte react route */}
        return <div>
                <nav className="navbar navbar-default navbar-static-top ">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">
                                Ranking
                            </a>
                        </div>
                        { !this.state.authData ? null : <ul className="nav navbar-nav navbar-right">
                            <li><Link to="addPage" className="btn" role="button">Add List</Link></li>
                        </ul> }
                        { !!this.state.authData ? null : <ul className="nav navbar-nav navbar-right">
                            <li><a className="btn" role="button" onClick={this.clickLogin}>Login</a></li>
                        </ul> }
                    </div>
                </nav>
                <RouteHandler/>
               </div>;
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
