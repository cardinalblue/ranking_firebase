import React  from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import PopularPageHandler from './components/PopularPage.js';
import ListPageHandler    from './components/ListPage.js';
import AddListPageHandler from './components/AddListPage.js';
import AddItemPageHandler from './components/AddItemPage.js'
import auth from './auth';

let App = React.createClass({
    getInitialState() {
        return {
            authData: null 
        };
    },

    clickLogin (e) {
        auth.login(function(e, authData) {
            this.setState({authData: authData});
        }.bind(this));
    },

    render() {

        return (
                <div>
                  <nav className="teal">
                    <div className="nav-wrapper">
                      <a href="#" className="brand-logo">Ranking</a>
                        { !this.state.authData ? null : <ul id="nav-mobile" className="right hide-on-med-and-down">
                                                          <li><Link to="addListPage" role="button">Add List</Link></li>
                                                        </ul>                                      
                        }
                        { !!this.state.authData ? null : <ul id="nav-mobile" className="right hide-on-med-and-down">
                                                           <li><a className="btn" role="button" onClick={this.clickLogin}>Login</a></li>
                                                         </ul> 
                        }
                    </div>
                  </nav>
                  <RouteHandler/>
                </div>
                );
    }
});

let routes = (
  <Route name="app" path="/" handler={App}>

    <Route name="popularPage" path="/popularPage" handler={PopularPageHandler}>
      {/*TODO: need to figure out why it cannot work*/}
      {/*<Route name="votePage" path=":itemKey" handler={VotePageHandler} />*/}
    </Route>
    <Route name="listPage"    path="/listPage/:listKey"    handler={ListPageHandler} />
    <Route name="addListPage" path="/addListPage/"         handler={AddListPageHandler} />
    <Route name="addItemPage" path="/addItemPage/:listKey" handler={AddItemPageHandler} />

    <DefaultRoute handler={PopularPageHandler}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
