import React      from 'react';
import VoteButton from './VoteButton';

let ListItem = React.createClass({
    getInitialState() {
        return { item: null };
    },
    componentWillMount() {
        this.props.itemRef.on("value", function(dataSnapshot) {
          this.setState({ item : dataSnapshot.val() });
        }.bind(this));
    },
    render() {
        var item = this.state.item;
        if (!item) {
          return (
            <li className="collection-item listItem span4">
              Loading
            </li>
          );
        }
        return (
                <li className="collection-item listItem span4">
                    {item.url.indexOf('youtube') == -1 ? <img src={item.url} /> :
                    <iframe width="420" height="315" src={item.url} frameborder="0" allowfullscreen></iframe> }
                    <div className="description">
                        <h5 className="title">{item.name}</h5>
                        <div className="voteTab">
                            <VoteButton voteRef={this.props.itemRef.child('vote')} voteNum={item.vote}/>
                            <span className="voteCounter">{item.vote}</span>
                        </div>
                    </div>
                </li>
            );
    }
});

export default ListItem;
