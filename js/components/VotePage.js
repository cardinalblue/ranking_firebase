import React from 'react';
import VoteItem from './VoteItem';

let VotePage = React.createClass({
    getInitialState() {
        this.itemRef = new Firebase("https://prada-test.firebaseio.com/items/" + this.props.params.itemName);
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
        this.itemRef.on("value", function(dataSnapshot) {
            var newState = {};
            newState.title = dataSnapshot.child("name").val();
            newState.items = this._toArray(dataSnapshot.child("list").val());
            newState.items.sort(function(a, b) {return b.vote - a.vote});
            this.setState(newState);
        }.bind(this));
    },
    createItem(item, index) {
        return <VoteItem key={index} item={item} voteRef={this.itemRef.child("list").child(index).child("vote")} />
    },
    render() {
      return    (
                    <div>
                        <ul className="collection">
                            {this.state.items.map(this.createItem)}
                        </ul>
                    </div>
                );
    }
});

export default VotePage;
