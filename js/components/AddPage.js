import React from 'react';
import Router from 'react-router';
import auth from '../auth';
import { DefaultRoute, Link, Route, RouteHandler, Navigation } from 'react-router';

let AdderList = React.createClass({
    getInitialState() {
      return {items: [], item_name: "", item_url: ""};
    },
    onNameChange(e) {
        this.setState({item_name: e.target.value});
    },
    onUrlChange(e) {
        this.setState({item_url: e.target.value});
    },
    addItem(e) {
        var nextItems = this.state.items.concat([{
            name : this.state.item_name,
            vote : 0,
            url : this.state.item_url}]);
        this.setState({items: nextItems, item_name: '', item_url: ''});
        this.props.syncData(nextItems);
    },
    render() {
        var createItem = function(item, index) {
            return <tr>
                    <td>{item.name}</td>
                    <td>{item.url}</td>
                    <td>Delete(TODO)</td>
                 </tr>;
        };
        return <tbody>
                {this.state.items.map(createItem)}
                <tr>
                    <td><input onChange={this.onNameChange} value={this.state.item_name} /></td>
                    <td><input onChange={this.onUrlChange} value={this.state.item_url} /></td>
                    <td><input type="button" onClick={ this.addItem } value="Add" /></td>
                </tr>
               </tbody>;
    }
});

var AddPage = React.createClass({
    mixins: [Navigation],
    getInitialState() {
        return {title: "", authData: auth.getAuthData(), savedItem: null};
    },
    onTitleChange(e) {
        this.setState({title: e.target.value});
    },
    onSavedList(e) {
        if (!e) { this.transitionTo('votePage', {itemName: this.state.savedItem.key()}) }
    },
    onSavedUser(e) {
        // TODO check the key is duplicate or not. if it's exist we will override this values
        var ref = new Firebase("https://prada-test.firebaseio.com/items/");
        this.state.savedItem = ref.push({
            owner: this.state.authData.uid,
            name: this.state.title,
            list: this.items
        }, this.onSavedList);
    },
    clickSubmit(e) {
        if (!this.state.authData) {
            this.clickBack(null);
            return;
        }
        var uid = this.state.authData.uid;
        var userRef = new Firebase("https://prada-test.firebaseio.com/Users/" + uid);
        // save user data first
        userRef.set(this.state.authData, this.onSavedUser);
    },
    syncData(items) {
        this.items = items;
    },
    render() {
      return <div>
                <div className="jumbotron">
                    <h1>Add</h1>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                      <input onChange={this.onTitleChange} value={this.state.title} placeholder="Title" />
                  </div>
                  <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Url</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <AdderList syncData={this.syncData}/>
                  </table>
                </div>
                <input type="button" onClick={ this.clickSubmit } value="Submit" />
             </div>;
    }
});


export default AddPage;
