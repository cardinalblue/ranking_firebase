import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

let PopularList = React.createClass({
    countVote() {
        // TODO count number from firebase db
        return 999;
    },
    render() {
        return <li className="list-group-item">
                <span className="badge">{this.countVote()}</span>
                <Link to="listPage" params={{listKey:this.props.listKey}}>{this.props.listName}</Link>
               </li>;
    }
});

export default PopularList;
