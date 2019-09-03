var CryptoJS = require("crypto-js");

var secretKey = "init secret key";

export function getSecretKey() {
  var keyArray = CryptoJS.enc.Base64.parse(secretKey);
  var key = keyArray.toString(CryptoJS.enc.Utf8);
  return key
}

export function setSecretKey(key) {
  secretKey = key
}
