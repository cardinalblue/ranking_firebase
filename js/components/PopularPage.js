import React from 'react';
import PopularItem from './PopularItem';

let PopularPage = React.createClass({
   /* Returns true if the inputted object is a JavaScript array */
   _isArray2(obj) {
       return (Object.prototype.toString.call(obj) === "[object Array]");
   },
   /* Converts a Firebase object to a JavaScript array */
   _toArray2(obj) {
       var out = [];
       if (obj) {
         if (this._isArray2(obj)) {
           out = obj;
         } else if (typeof(obj) === "object") {
           for (var key in obj) {
             if (obj.hasOwnProperty(key)) {
               var v = obj[key];
               v.key = key;
               out.push(v);
             }
           }
         }
       }
       return out;
   },
    componentWillMount() {
        this.firebaseRef.on("value", function(dataSnapshot) {
          var newState = {};
          newState.items = this._toArray2(dataSnapshot.val());
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
        return <PopularItem key={index} onClickItem={this.clickItem} itemKey={item.key}
                 itemName={item.name} itemRef={this.firebaseRef.child(item.name)}/>
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
