import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

let PopularItem = React.createClass({
    countVote() {
        // TODO count number from firebase db
        return 999;
    },
    render() {
        return  (
                    <li className="collection-item avatar">
                        <Link   to="votePage" 
                                params={{itemName: this.props.itemKey}}>
                            <img src="http://lorempixel.com/g/70/70/" alt="" />

                            <div className="title">{this.props.itemName}</div>
                            <i className="mdi-social-whatshot" />
                            <i className="mdi-social-whatshot" />
                            <i className="mdi-social-whatshot" />
                            <i className="mdi-social-whatshot" />
                            <i className="mdi-social-whatshot" /> 
                        </Link> 
                    </li>
                );

                

    }
});

export default PopularItem;
