var ItemPage = React.createClass({
    mixins: [ReactFireMixin],
    clickVote: function(item) {
        item.vote = item.vote + 1;
        this.firebaseRef.child("list").child(item.name).update(item);
    },
    getInitialState: function() {
        this.firebaseRef = new Firebase("https://prada-test.firebaseio.com/items/" + this.props.name);
        return {items: []};
    },
    componentWillMount: function() {
      this.bindAsArray(this.firebaseRef.child("list"), "items");
    },
    clickBack: function(e) {
      this.props.onBackClick(e);
    },
    createItem : function(item, index) {
        return <li key={index}>
                    ({item.vote})
                    <a href={item.url}>{item.name}</a>
                    <input type="button" onClick={ this.clickVote.bind(this, item) } value="Vote" />
               </li>;
    },
    render: function() {
      this.state.items.sort(function(a, b) {return b.vote - a.vote});
      return <div>
                <h1>{this.props.name}</h1>
                <input type="button" onClick={this.clickBack} value="Back" />
                <ul>{this.state.items.map(this.createItem)}</ul>
             </div>;
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
        return <li key={index}>
                <input type="button" onClick={ this.clickItem.bind(this, item.name) } value={item.name} />
            </li>;
    },
    render: function() {
      return <div>
                <h1>Popular</h1>
                <ul>{this.state.items.map(this.createItem)}</ul>
             </div>;
    }
});

var VoteList = React.createClass({
  render: function() {
    var createItem = function(item, index) {
      return <li>{item.name} : {item.url}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

var AddPage = React.createClass({
    getInitialState: function() {
        return {items: [], item_name: "", item_url: "", title: ""};
    },
    onTitleChange: function(e) {
        this.setState({title: e.target.value});
    },
    onNameChange: function(e) {
        this.setState({item_name: e.target.value});
    },
    onUrlChange: function(e) {
        this.setState({item_url: e.target.value});
    },
    clickBack: function(e) {
      this.props.onBackClick(e);
    },
    addItem: function(e) {
        var nextItems = this.state.items.concat([{
            name : this.state.item_name,
            url : this.state.item_url}]);
        var nextText = '';
        this.setState({items: nextItems, item_name: nextText, item_url: nextText});
    },
    onSavedList : function(e) {
        if (!e) { this.props.onFinishAddList(); }
    },
    onSaveUser : function(e) {
        // TODO check the key is duplicate or not. if it's exist we will override this values
        var ref = new Firebase("https://prada-test.firebaseio.com/items/" + this.state.title);
        var len = this.state.items.length;
        var list = {};
        for (var i = 0; i < len; i++) {
            var t = this.state.items[i];
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
        // save user instance first
        userRef.set(this.props.authData, this.onSaveUser);
    },
    render: function() {
      return <div>
                <h1>Add List</h1>
                <input onChange={this.onTitleChange} value={this.state.title} />
                <VoteList items={this.state.items} />
                <input onChange={this.onNameChange} value={this.state.item_name} />
                <input onChange={this.onUrlChange} value={this.state.item_url} />
                <input type="button" onClick={ this.addItem } value={'Add #' + (this.state.items.length + 1)} />
                <input type="button" onClick={ this.clickSubmit } value="Submit" />
                <input type="button" onClick={ this.clickBack } value="Back" />
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
        var ref = new Firebase("https://prada-test.firebaseio.com");
        ref.authWithOAuthPopup("facebook", this.loginFacebook);
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
        switch(navId) {
            case 3:
                page = <AddPage onFinishAddList={this.finishAddList} onBackClick={this.pressBackButton}
                    authData={ this.state.authData } />;
                break;
            case 2:
                page = <ItemPage name={this.state.selected_item} onBackClick={this.pressBackButton} />;
                break;
            case 1:
            default:
                page = <PopularPage onItemClick={this.selectItem} />;
                break;
        }
        var auth;
        if (!!this.state.authData) {
            var addBtn;
            if (navId != 3) {
                addBtn = <input type="button" onClick={this.clickAddButton} value="Add List" />;
            }
            auth = <div>
                    <p>Welcome { this.state.authData.facebook.displayName } !</p>
                    { addBtn }
                   </div>; 
        } else {
            auth = <input type="button" onClick={this.clickLogin} value="Login" />;
        }
        return <div>
                { auth }
                { page }
               </div>;
    }
});

setInterval(function() {
    React.render(<RankingApplication />, document.getElementById('container'));
}, 100);