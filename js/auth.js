module.exports = {
  login(cb) {
      new Firebase("https://prada-test.firebaseio.com").authWithOAuthPopup("facebook", function(e, data) {
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
