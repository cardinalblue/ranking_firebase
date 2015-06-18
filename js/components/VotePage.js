import React from 'react';
import VoteItem from './VoteItem';
import Utils from '../utils';

let VotePage = React.createClass({
    getInitialState() {
        this.itemRef = new Firebase("https://prada-test.firebaseio.com/items/" + this.props.params.itemKey);
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
        return <VoteItem key={index} item={item} voteRef={this.itemRef.child("list").child(index).child("vote")} />
    },
    render() {
      return <div>
                <div className="jumbotron">
                    <h1>{this.state.title}</h1>
                </div>
                <ul className="list-group">
                    {this.state.items.map(this.createItem)}
                </ul>
             </div>;
    }
});

export default VotePage;
