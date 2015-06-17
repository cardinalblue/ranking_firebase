import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

let PopularItem = React.createClass({

  clickItem(e) {
    console.log(this.props);
    this.props.onClickItem(this.props.itemName);
  },

  render() {
    console.log('PopularItem');
    return (
      <li>
        <Link to="votePage" 
              params={{itemName:this.props.itemName}}>{this.props.itemName}</Link>
      </li>    
    );
  }

});

export default PopularItem;