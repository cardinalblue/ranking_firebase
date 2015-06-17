var VoteButton = React.createClass({
    clickVote: function(e) {
        var vote = this.props.voteNum + 1; // FIXME take care issue of race condition
        this.props.voteRef.set(vote);
    },
    render: function() {
        return <button type="button" className="btn btn-default" onClick={this.clickVote}>Vote</button>;
    }
});

var VoteItem = React.createClass({
    render: function() {
        var item = this.props.item;
        return <li className="list-group-item">
            <span className="badge">{item.vote}</span>
            <VoteButton voteRef={this.props.voteRef} voteNum={item.vote}/>
            <a href={item.url}>{item.name}</a>
           </li>;
    }
});

var VotePage = React.createClass({
    getInitialState: function() {
        this.listRef = new Firebase("https://prada-test.firebaseio.com/items/" + this.props.name).child("list");
        return {items: []};
    },
     /* Returns true if the inputted object is a JavaScript array */
    _isArray: function(obj) {
        return (Object.prototype.toString.call(obj) === "[object Array]");
    },
    /* Converts a Firebase object to a JavaScript array */
    _toArray: function(obj) {
        var out = [];
        if (obj) {
          if (this._isArray(obj)) {
            out = obj;
          } else if (typeof(obj) === "object") {
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) {
                out.push(obj[key]);
              }
            }
          }
        }
        return out;
    },
    componentWillMount: function() {
        this.listRef.on("value", function(dataSnapshot) {
          var newState = {};
          newState.items = this._toArray(dataSnapshot.val());
          newState.items.sort(function(a, b) {return b.vote - a.vote});
          this.setState(newState);
        }.bind(this));
    },
    createItem: function(item, index) {
        return <VoteItem key={index} item={item} voteRef={this.listRef.child(item.name).child("vote")} />
    },
    render: function() {
      return <div>
                <ul className="list-group">
                    {this.state.items.map(this.createItem)}
                </ul>
             </div>;
    }
});

var PopularItem = React.createClass({
    clickItem:function(e) {
        this.props.onClickItem(this.props.itemName);
    },
    countVote:function() {
        // TODO count number from firebase db
        return 999;
    },
    render: function() {
        return <li className="list-group-item" onClick={this.clickItem}>
                <span className="badge">{this.countVote()}</span>
                {this.props.itemName}
               </li>;
    }
});

var PopularPage = React.createClass({
    mixins: [ReactFireMixin],
    componentWillMount: function() {
        this.bindAsArray(this.firebaseRef, "items");
    },
    getInitialState: function() {
        this.firebaseRef = new Firebase("https://prada-test.firebaseio.com/items/");
        return {items: []};
    },
    clickItem: function(itemName) {
        this.props.onItemClick(itemName);
    },
    createItem : function(item, index) {
        return <PopularItem key={index} onClickItem={this.clickItem} itemName={item.name} 
                 itemRef={this.firebaseRef.child(item.name)}/>
    },
    render: function() {
      return <div>
                <ul className="list-group">
                    {this.state.items.map(this.createItem)}
                </ul>
             </div>;
    }
});

var AdderList = React.createClass({
    getInitialState: function() {
      return {items: [], item_name: "", item_url: ""};
    },
    onNameChange: function(e) {
        this.setState({item_name: e.target.value});
    },
    onUrlChange: function(e) {
        this.setState({item_url: e.target.value});
    },
    addItem: function(e) {
        var nextItems = this.state.items.concat([{
            name : this.state.item_name,
            url : this.state.item_url}]);
        this.setState({items: nextItems, item_name: '', item_url: ''});
        this.props.syncData(nextItems);
    },
    render: function() {
        var createItem = function(item, index) {
            return <tr>
                    <td>{item.name}</td>
                    <td>{item.url}</td>
                    <td>Delete(TODO)</td>
                 </tr>;
        };
        return <tbody>
                {this.state.items.map(createItem)}
                <tr>
                    <td><input onChange={this.onNameChange} value={this.state.item_name} /></td>
                    <td><input onChange={this.onUrlChange} value={this.state.item_url} /></td>
                    <td><input type="button" onClick={ this.addItem } value="Add" /></td>
                </tr>
               </tbody>;
    }
});

var AddPage = React.createClass({
    getInitialState: function() {
        return {title: ""};
    },
    onTitleChange: function(e) {
        this.setState({title: e.target.value});
    },
    onSavedList : function(e) {
        if (!e) { this.props.onFinishAddList(); }
    },
    onSavedUser : function(e) {
        // TODO check the key is duplicate or not. if it's exist we will override this values
        var ref = new Firebase("https://prada-test.firebaseio.com/items/" + this.state.title);
        var len = this.items.length; // FIXME list get from VoteList
        var list = {};
        for (var i = 0; i < len; i++) {
            var t = this.items[i];
            list[t.name] = t;
            list[t.name].vote = 0;
        }
        ref.set({
            owner: this.props.authData.uid,
            name: this.state.title,
            list: list
        }, this.onSavedList);
    },
    clickSubmit : function(e) {
        if (!this.props.authData) {
            this.clickBack(null);
            return;
        }
        var uid = this.props.authData.uid;
        var userRef = new Firebase("https://prada-test.firebaseio.com/Users/" + uid);
        // save user data first
        userRef.set(this.props.authData, this.onSavedUser);
    },
    syncData : function(items) {
        this.items = items;
    },
    render: function() {
      return <div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                      <input onChange={this.onTitleChange} value={this.state.title} placeholder="Title" />
                  </div>
                  <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Url</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <AdderList syncData={this.syncData}/>
                  </table>
                </div>
                <input type="button" onClick={ this.clickSubmit } value="Submit" />
             </div>;
    }
});

var RankingApplication = React.createClass({
    getInitialState: function() {
        return {pageId:1, selected_item: null, authData: null};
    },
    selectItem : function(itemName) {
        this.state.pageId = 2; // move to vote list
        this.state.selected_item = itemName;
    },
    pressBackButton : function(e) {
        this.state.pageId = 1; // move to popular
        this.state.selected_item = null;
    },
    loginFacebook : function(e, authData) {
        if (!e) { this.state.authData = authData; }
    },
    clickLogin : function(e) {
        new Firebase("https://prada-test.firebaseio.com").authWithOAuthPopup("facebook", this.loginFacebook);
    },
    clickAddButton : function(e) {
        this.state.pageId = 3; // move to add page
    },
    finishAddList : function() {
        this.state.pageId = 1; // move to popular
    },
    render: function() {
        var page;
        var navId = this.state.pageId;
        var title;
        switch(navId) {
            case 3:
                title = "Add";
                page = <AddPage onFinishAddList={this.finishAddList} authData={ this.state.authData } />;
                break;
            case 2:
                title = this.state.selected_item;
                page = <VotePage name={this.state.selected_item} />;
                break;
            case 1:
            default:
                title = "Popular";
                page = <PopularPage onItemClick={this.selectItem} />;
                break;
        }
        var backBtn;
        if (navId != 1) {
            backBtn = <ul className="nav navbar-nav navbar-right">
                        <li><a className="btn" role="button" onClick={this.pressBackButton}>Back</a></li>
                      </ul>;
        }
        var auth;
        if (!!this.state.authData) {
            var addBtn;
            if (navId != 3) {
                addBtn = <a className="btn" role="button" onClick={this.clickAddButton}>Add List</a>
            }
            // <p>Welcome { this.state.authData.facebook.displayName } !</p> // TODO put user name on page
            auth = addBtn; 
        } else {
            auth = <a className="btn" role="button" onClick={this.clickLogin}>Login</a>;
        }
        return <div>
                <nav className="navbar navbar-default navbar-static-top ">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">
                                Ranking
                            </a>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li>{auth}</li>
                        </ul>
                        {backBtn}
                    </div>
                </nav>
                <div className="jumbotron">
                    <h1>{title}</h1>
                </div>
                {page}
               </div>;
    }
});

setInterval(function() {
    React.render(<RankingApplication />, document.getElementById('container'));
}, 100);