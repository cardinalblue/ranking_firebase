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
      return <ul>{this.state.items.map(this.createItem)}</ul>;
    }
});

var RankingApplication = React.createClass({
    getInitialState: function() {
        return {selected_item: null};
    },
    selectItem : function(itemName) {
        this.state.selected_item = itemName;
    },
    pressBackButton : function(e) {
        this.state.selected_item = null;
    },
    clickLogin : function(e) {
        var ref = new Firebase("https://prada-test.firebaseio.com");
        ref.authWithOAuthPopup("facebook", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });
    },
    render: function() {
      if (!this.state.selected_item) {
          return <div>
                    <h1>Popular</h1>
                    <input type="button" onClick={this.clickLogin} value="Login" />
                    <PopularPage onItemClick={this.selectItem} />
                </div>;
      } else {
          return <div>
                    <h1>{this.state.selected_item}</h1>
                    <input type="button" onClick={this.clickLogin} value="Login" />
                    <ItemPage name={this.state.selected_item} onBackClick={this.pressBackButton} />
                 </div>;
      }
    }
});

setInterval(function() {
    React.render(<RankingApplication />, document.getElementById('container'));
}, 100);