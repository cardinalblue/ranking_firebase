import React from 'react';
import VoteItem from './VoteItem';

let VotePage = React.createClass({
    getInitialState() {
        this.listRef = new Firebase("https://prada-test.firebaseio.com/items/" + this.props.params.itemName).child("list");
        return {items: []};
    },
     /* Returns true if the inputted object is a JavaScript array */
    _isArray(obj) {
        return (Object.prototype.toString.call(obj) === "[object Array]");
    },
    /* Converts a Firebase object to a JavaScript array */
    _toArray(obj) {
        var out = [];
        if (obj) {
          if (this._isArray(obj)) {
            out = obj;
          } else if (typeof(obj) === "object") {
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) {
                out.push(obj[key]);
              }
            }
          }
        }
        return out;
    },
    componentWillMount() {
        this.listRef.on("value", function(dataSnapshot) {
          var newState = {};
          newState.items = this._toArray(dataSnapshot.val());
          newState.items.sort(function(a, b) {return b.vote - a.vote});
          this.setState(newState);
        }.bind(this));
    },
    createItem(item, index) {
        return <VoteItem key={index} item={item} voteRef={this.listRef.child(item.name).child("vote")} />
    },
    render() {
      return <div>
                <div className="jumbotron">
                    <h1>{this.props.params.itemName}</h1>
                </div>
                <ul className="list-group">
                    {this.state.items.map(this.createItem)}
                </ul>
             </div>;
    }
});

export default VotePage;
