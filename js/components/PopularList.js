import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

let PopularList = React.createClass({
    countVote() {
        // TODO count number from firebase db
        return 999;
    },
    
    render() {
        return (
                <li className="collection-item avatar">
                  <Link to="listPage" 
                        params={{listKey: this.props.listKey}}>

                    <img src={this.props.listImg} alt="listImage" />

                    <div className="title">{this.props.listName}</div>
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

export default PopularList;
