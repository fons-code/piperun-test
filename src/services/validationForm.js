const validation = {
  isEmpty: function(text) {
    if (text) return true;
    else return false;
  },
  isAlphaNum: function(text) {
    const alphaNumeric = new RegExp("/[^A-Za-z0-9]/");
    const result = alphaNumeric.test(text);
    return result;
  },
  isEmail: function(text) {
    {
      const email = new RegExp("");
      const result = email.test(text);
      return result;
    }
  },
  isOnlyNum: function(text) {
    const numeric = new RegExp("/^[0-9]/");
    const result = numeric.test(text);
    return result;
  }
};
export default {
  validation
};
