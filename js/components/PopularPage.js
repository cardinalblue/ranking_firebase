import React from 'react';
import PopularItem from './PopularItem';

let PopularPage = React.createClass({
  
  mixins: [ReactFireMixin],
  
  componentWillMount() {
    this.bindAsArray(this.firebaseRef, "items");
  },

  getInitialState() {
    this.firebaseRef = new Firebase("https://prada-test.firebaseio.com/items/");
    return {items: []};
  },

  clickItem(itemName) {  
    console.log('click!!');
    
    this.props.onItemClick(itemName);
  },

  createItem (item, index) {
    return <PopularItem key={index} onClickItem={this.clickItem} itemName={item.name} />;
  },


  render() {
    return (
      <div>
        <ul>{this.state.items.map(this.createItem)}</ul>
      </div>
      
    );
  }
});

export default PopularPage;