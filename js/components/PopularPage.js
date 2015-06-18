import React from 'react';
import PopularItem from './PopularItem';
import Utils from '../utils';

let PopularPage = React.createClass({
    componentWillMount() {
        this.firebaseRef.on("value", function(dataSnapshot) {
          var newState = {};
          newState.items = Utils.toArray(dataSnapshot.val());
          this.setState(newState);
        }.bind(this));
    },
    getInitialState() {
        this.firebaseRef = new Firebase("https://prada-test.firebaseio.com/items/");
        return {items: []};
    },
    clickItem(itemName) {
        this.props.onItemClick(itemName);
    },
    createItem(item, index) {
        return <PopularItem key={index} onClickItem={this.clickItem}
                 itemKey={item.key}
                 itemName={item.name}
                 itemRef={this.firebaseRef.child(item.name)} itemImg={item.list[0].url}/>
    },
    render() {
      return <div>
                <div className="jumbotron">
                    <h1>Popular</h1>
                </div>
                <ul className="list-group">
                    {this.state.items.map(this.createItem)}
                </ul>
             </div>;
    }
});

export default PopularPage;
