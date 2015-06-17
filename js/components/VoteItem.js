import React from 'react';

let VoteButton = React.createClass({
    clickVote(e) {
        var vote = this.props.voteNum + 1; // FIXME take care issue of race condition
        this.props.voteRef.set(vote);
    },
    render() {
        return <button type="button" className="btn btn-default" onClick={this.clickVote}>Vote</button>;
    }
});

let VoteItem = React.createClass({
    render() {
        var item = this.props.item;
        return <li className="list-group-item">
            <span className="badge">{item.vote}</span>
            <VoteButton voteRef={this.props.voteRef} voteNum={item.vote}/>
            <a href={item.url}>{item.name}</a>
            {item.url.indexOf('youtube') == -1 ? <img src={item.url} /> :
            <iframe width="420" height="315" src={item.url} frameborder="0" allowfullscreen></iframe> }
           </li>;
    }
});

export default VoteItem;
