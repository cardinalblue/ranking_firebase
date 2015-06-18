import React from 'react';
import Router from 'react-router';
import auth from '../auth';
import Utils from '../utils';
import { DefaultRoute, Link, Route, RouteHandler, Navigation } from 'react-router';

let AddItemList = React.createClass({
    mixins: [Navigation],
    getInitialState() {
      return {items: [], item_name: "", item_url: ""};
    },
    onNameChange(e) {
        this.setState({item_name: e.target.value});
    },
    onUrlChange(e) {
        this.setState({item_url: e.target.value});
    },
    onSavedItem(e) {
      if (!e) {
        this.transitionTo('listPage', {listKey: this.props.listKey});
      }
    },
    addItem(e) {
        var item = {
            name : this.state.item_name,
            vote : 0,
            url : this.state.item_url};
        this.props.listRef.child("list").push(item, this.onSavedItem);
    },
    render() {
        return <tbody>
                <tr>
                    <td><input onChange={this.onNameChange} value={this.state.item_name} /></td>
                    <td><input onChange={this.onUrlChange} value={this.state.item_url} /></td>
                    <td><input type="button" onClick={ this.addItem } value="Add" /></td>
                </tr>
               </tbody>;
    }
});

var AddItemPage = React.createClass({
    getInitialState() {
        return {title: "", listKey: this.props.params.listKey};
    },
    componentWillMount() {
      this.listRef = new Firebase("https://prada-test.firebaseio.com/Lists/" + this.state.listKey);
      this.listRef.on("value", function(dataSnapshot) {
        var newState = {};
        newState.title = dataSnapshot.child('name').val();
        this.setState(newState);
      }.bind(this));
    },
    render() {
      return <div>
                <div className="jumbotron">
                    <h1>Add Item</h1>
                    <h1>{this.state.title}</h1>
                </div>
                <div className="panel panel-default">
                  <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Url</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <AddItemList listRef={this.listRef} listKey={this.state.listKey}/>
                  </table>
                </div>
             </div>;
    }
});


export default AddItemPage;
