const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

const encrpyt = data => {
  return cryptojs.AES.encrypt(data, process.env.SECRET_KEY).toString();
};

const decrypt = data => {
  return cryptojs.AES.decrypt(data, process.env.SECRET_KEY).toString(
    cryptojs.enc.Utf8
  );
};

const signJwt = payload => {
  return jwt.sign(payload, process.env.SECRET_KEY);
};

module.exports = { encrpyt, decrypt, signJwt };
