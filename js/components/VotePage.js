import React from 'react';
import VoteItem from './VoteItem';

let VotePage = React.createClass({
  
  mixins: [ReactFireMixin],
  
  getInitialState() {
    this.listRef = new Firebase("https://prada-test.firebaseio.com/items/" + this.props.params.itemName).child("list");
    return {items: []};
  },
  
  componentWillMount() {
    this.bindAsArray(this.listRef, "items");
  },
  
  createItem(item, index) {
    return <VoteItem key={index} item={item} itemRef={this.listRef.child(item.name)} />
  },
  
  render() {
    console.log(this.props);
    return (
      <div>
        
        <p>{this.props.params.itemName}</p>
        
        <ul>{this.state.items.map(this.createItem)}</ul>
      </div>
    );
  }
});

export default VotePage;