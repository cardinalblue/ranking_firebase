import React from 'react';

let VoteButton = React.createClass({
    getInitialState() {
        return {
            voteNum: this.props.voteNum,
            isUpdating: false
        };
    },

    clickVote(e) {
        if (this.state.isUpdating) {
            return;
        }
        this.state.isUpdating = true;
        this.props.voteRef.transaction(function(currentData) {
            if (currentData === null) {
                return 1;
            } else {
                return currentData + 1;
            }
        }, function(error, committed, snapshot) {
            this.state.isUpdating = false;
        }.bind(this));

    },

    render() {
        return (
                <button type="button"
                        className="upVoteBtn btn-floating btn-large waves-effect waves-light pink accent-2"
                        onClick={this.clickVote}>
                    <i className="mdi-hardware-keyboard-arrow-up" />
                </button>
            );
    }
});

export default VoteButton;
