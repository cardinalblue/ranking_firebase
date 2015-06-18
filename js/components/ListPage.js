import React from 'react';
import ListItem from './ListItem';
import Utils from '../utils';
import { DefaultRoute, Link, Route, RouteHandler, Navigation } from 'react-router';

let ListPage = React.createClass({
    mixins: [Navigation],
    getInitialState() {
        this.itemRef = new Firebase("https://prada-test.firebaseio.com/Lists/" + this.props.params.listKey);
        return {items: []};
    },
    componentWillMount() {
        this.itemRef.on("value", function(dataSnapshot) {
          var newState = {};
          newState.title = dataSnapshot.child("name").val();
          newState.items = Utils.toArray(dataSnapshot.child("list").val());
          newState.items.sort(function(a, b) {return b.vote - a.vote});
          this.setState(newState);
        }.bind(this));
    },
    createItem(item, index) {
        return <ListItem key={index} item={item} voteRef={this.itemRef.child("list").child(item.key).child("vote")} />
    },
    addItem(e) {
        this.transitionTo('addItemPage', {listKey: this.props.params.listKey})
    },
    render() {
      return  (
                <div className="center-align">
                    <ul className="collection list-collection">
                        {this.state.items.map(this.createItem)}
                    </ul>
                    <Link to="addItemPage" className="btn" role="button" params={{listKey: this.props.params.listKey}}>Add Item</Link>
                </div>
              );
    }
});

export default ListPage;
