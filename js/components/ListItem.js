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

        return  (
                    <button type="button" 
                            className="upVoteBtn btn-floating btn-large waves-effect waves-light pink accent-2" 
                            onClick={this.clickVote}>
                        <i className="mdi-hardware-keyboard-arrow-up" />
                    </button>
                );
    }
});

let ListItem = React.createClass({
    render() {
        var item = this.props.item;
        return  (
                    <li className="collection-item voteItem">                   
                        <img src="http://lorempixel.com/g/398/200/" alt="" />
                        <div className="description">
                            <h5 className="title">{item.name}</h5>

                            <div className="voteTab">
                                <VoteButton voteRef={this.props.voteRef} voteNum={item.vote}/>
                                <span className="voteCounter">{item.vote}</span>
                            </div>
                        </div>
                        
                        
                        {/*{item.url.indexOf('youtube') == -1 ? <img src={item.url} /> :*/}
                        {/*<iframe width="420" height="315" src={item.url} frameborder="0" allowfullscreen></iframe> }*/}
                                                    
                    </li>

                );
    }
});

export default ListItem;
