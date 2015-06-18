import React  from 'react';
import Router from 'react-router';
import auth   from '../auth';
import Utils  from '../utils';
import { DefaultRoute, Link, Route, RouteHandler, Navigation } from 'react-router';

var AddListPage = React.createClass({
    mixins: [Navigation],
    getInitialState() {
        return {
            title: "", 
            authData: auth.getAuthData(), 
            savedItem: null
        };
    },

    onTitleChange(e) {
        this.setState({title: e.target.value});
    },

    onSavedList(e) {
        if (!e) { this.transitionTo('listPage', {listKey: this.state.savedItem.key()}) }
    },

    onSavedUser(e) {
        // TODO check the key is duplicate or not. if it's exist we will override this values
        var ref = new Firebase("https://prada-test.firebaseio.com/Lists/");
        this.state.savedItem = ref.push({
            owner: this.state.authData.uid,
            name:  this.state.title,
            list:  []
        }, this.onSavedList);
    },

    clickSubmit(e) {
        var uid     = this.state.authData.uid;
        var userRef = new Firebase("https://prada-test.firebaseio.com/Users/" + uid);
        // save user data first
        userRef.set(this.state.authData, this.onSavedUser);
    },

    render() {
      return (
            <div>
              <div className="jumbotron">
                <h1>Add List</h1>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <input onChange={this.onTitleChange}
                         value={this.state.title}
                         placeholder="Title" 
                  />
                </div>
              </div>
              <input type="button" onClick={this.clickSubmit} value="Submit" />
           </div>
        );
    }
});


export default AddListPage;
