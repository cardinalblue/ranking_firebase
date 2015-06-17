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
                <span className="badge">{this.countVote()}</span>
                <Link to="votePage"
                  params={{itemName:this.props.itemName}}>{this.props.itemName}</Link>
               </li>;
    }
});

export default PopularItem;
