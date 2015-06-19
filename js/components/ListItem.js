import React      from 'react';
import VoteButton from './VoteButton';

let ListItem = React.createClass({
    render() {
        var item = this.props.item;
        return (
                <li className="collection-item listItem">                   
                    {item.url.indexOf('youtube') == -1 ? <img src={item.url} /> :
                    <iframe width="420" height="315" src={item.url} frameborder="0" allowfullscreen></iframe> }
                    <div className="description">
                        <h5 className="title">{item.name}</h5>

                        <div className="voteTab">
                            <VoteButton voteRef={this.props.voteRef} voteNum={item.vote}/>
                            <span className="voteCounter">{item.vote}</span>
                        </div>
                    </div>
                </li>
            );
    }
});

export default ListItem;
