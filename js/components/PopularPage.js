import React from 'react';
import PopularList from './PopularList';
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
        this.firebaseRef = new Firebase("https://prada-test.firebaseio.com/Lists/");
        return {items: []};
    },
    clickItem(itemName) {
        this.props.onItemClick(itemName);
    },
    createItem(item, index) {
        return <PopularList key={index} onClickItem={this.clickItem}
                 listKey={item.key}
                 listName={item.name} />
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
