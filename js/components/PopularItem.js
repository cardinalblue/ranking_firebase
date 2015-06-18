import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

let PopularItem = React.createClass({
    countVote() {
        // TODO count number from firebase db
        return 999;
    },
    render() {
        return <li className="list-group-item">
                <img src={this.props.itemImg} />
                <span className="badge">{this.countVote()}</span>
                <Link to="votePage"
                  params={{itemKey:this.props.itemKey}}>{this.props.itemName}</Link>
                <Link to="editPage"
                  params={{itemKey:this.props.itemKey}}>Edit</Link>
               </li>;
    }
});

export default PopularItem;
