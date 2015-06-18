import React  from 'react';
import Router from 'react-router';
import auth   from '../auth';
import Utils  from '../utils';
import { DefaultRoute, Link, Route, RouteHandler, Navigation } from 'react-router';

var AddItemPage = React.createClass({
    mixins: [Navigation],
    getInitialState() {
        return {
            title:     "", 
            listKey:   this.props.params.listKey, 
            items:     [], 
            item_name: "", 
            item_url:  ""
        };
    },

    componentWillMount() {
      this.listRef = new Firebase("https://prada-test.firebaseio.com/Lists/" + this.state.listKey);
      this.listRef.on("value", function(dataSnapshot) {
        var newState   = {};
        newState.title = dataSnapshot.child('name').val();
        this.setState(newState);
      }.bind(this));
    },

    onNameChange(e) {
        this.setState({
            item_name: e.target.value
        });
    },

    onUrlChange(e) {
        this.setState({
            item_url: e.target.value
        });
    },

    onSavedItem(e) {
      if (!e) {
        this.transitionTo('listPage', {
            listKey: this.state.listKey
        });
      }
    },

    addItem(e) {
        var item = {
            name : this.state.item_name,
            vote : 0,
            url  : this.state.item_url
        };
        this.listRef.child("list").push(item, this.onSavedItem);
    },

    render() {
        return (
                <div className="row addItem-container center-align">
                  <form className="col s12 teal">
                    <div className="row">
                      <div className="input-field col s12">
                        <label for="title">Title</label>
                        <input onChange={this.onNameChange}
                               value   ={this.state.item_name} id="title" type="text" className="validate" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <label for="url">Url</label>
                        <input onChange={this.onUrlChange}
                               value={this.state.item_url} id="url" type="text" className="validate" />
                      </div>
                    </div>  
                  </form>
                  <input className="btn grey lighten-1 addItemBtn" type="button" onClick={ this.addItem } value="Add" />
                </div>
            );
    }
});


export default AddItemPage;
