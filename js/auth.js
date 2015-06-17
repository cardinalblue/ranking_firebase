module.exports = {
  login(cb) {
      var self = this;
      new Firebase("https://prada-test.firebaseio.com").authWithOAuthPopup("facebook", function(e, data) {
        self.authData = data;
        if (cb) {
          cb(e, data);
        }
      });
  },
  getAuthData() {
      return this.authData;
  }
}
