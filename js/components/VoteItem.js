import React from 'react';

let VoteButton = React.createClass({
    clickVote(e) {
        // TODO sync vote number at local to increasing the response time
        var vote = this.props.voteNum + 1; // FIXME take care issue of race condition
        this.props.voteRef.set(vote);
    },
    render() {
        return <span className="glyphicon glyphicon-ok" aria-hidden="true" onClick={this.clickVote}></span>;

    }
});

let VoteItem = React.createClass({
    render() {
        var item = this.props.item;
        return <li className="list-group-item">
            {item.vote}
            <VoteButton voteRef={this.props.voteRef} voteNum={item.vote}/>
            <a href={item.url}>{item.name}</a>
            {item.url.indexOf('youtube') == -1 ? <img src={item.url} /> :
            <iframe width="420" height="315" src={item.url} frameborder="0" allowfullscreen></iframe> }
           </li>;
    }
});

export default VoteItem;
