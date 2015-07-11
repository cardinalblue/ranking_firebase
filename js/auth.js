module.exports = {
  login(cb) {
      new Firebase("https://rankings.firebaseio.com").authWithOAuthPopup("facebook", function(e, data) {
        this.authData = data;
        if (cb) {
          cb(e, data);
        }
      }.bind(this));
  },
  getAuthData() {
      return this.authData;
  }
};
