import React    from 'react';
import ListItem from './ListItem';
import Utils    from '../utils';
import { DefaultRoute, Link, Route, RouteHandler, Navigation } from 'react-router';

let ListPage = React.createClass({
    mixins: [Navigation],
    
    getInitialState() {
        this.itemListRef = new Firebase("https://rankings.firebaseio.com/Lists/" + this.props.params.listKey + "/list/");
        return {
          items: []
        };
    },

    componentWillMount() {
        this.itemListRef.once("value", function(dataSnapshot) {
          var newState = {};
          newState.items = Utils.toArray(dataSnapshot.val());
          newState.items.sort(function(a, b) {return b.vote - a.vote});
          this.setState(newState);
        }.bind(this));
        // FIXME add/remove childs
        return {
          items: []
        };
    },
    createItem(item, index) {
        return (
          <ListItem key={index} 
                    item={item} 
                    itemRef={this.itemListRef.child(item.key)}
          />);
    },

    addItem(e) {
        this.transitionTo('addItemPage', {listKey: this.props.params.listKey});
    },

    render() {
        return (
          <div className="center-align">
            <ul className="collection list-collection">
                {this.state.items.map(this.createItem)}
            </ul>
            <Link to="addItemPage" 
                  className="btn" 
                  role="button" 
                  params={{listKey: this.props.params.listKey}}>Add Item
            </Link>
          </div>
        );
    }
});

export default ListPage;
