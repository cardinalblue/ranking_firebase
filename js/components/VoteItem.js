import React from 'react';


let VoteItem = React.createClass({
  
  clickVote(e) {
    var t  = this.props.item;
    t.vote = t.vote + 1; // FIXME take care issue of race condition
    this.props.itemRef.update(t);
  },
  
  render() {
    var item = this.props.item;
    return ( 
      <li>
        ( {item.vote} )
        <a href={item.url}>{item.name}</a>
        <input type="button" onClick={this.clickVote} value="Vote" />
      </li>
    );
  }
});

export default VoteItem;