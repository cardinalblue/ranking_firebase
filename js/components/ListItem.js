import React from 'react';

let VoteButton = React.createClass({
    getInitialState() {
        return {voteNum: this.props.voteNum};
    },
    clickVote(e) {
        // FIXME take care issue of race condition
        var vote = this.state.voteNum + 1;
        this.props.voteRef.set(vote);
        this.setState({voteNum: vote});
    },
    render() {
        return <span className="glyphicon glyphicon-ok" aria-hidden="true" onClick={this.clickVote}></span>;
    }
});

let ListItem = React.createClass({
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

export default ListItem;
