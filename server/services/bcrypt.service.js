const CryptoJS = require('crypto-js');
const SECRET_KEYB = process.env.SECRET_KEYB;

class CryptoHandler {
  constructor() {
    if (!SECRET_KEYB || !SECRET_KEYB.length) {
      throw new ErrorHandler(500, 'please see env');
    }
  }

  static encrypt = (param) => {
    const output = CryptoJS.AES.encrypt(param, SECRET_KEYB).toString();
    return output;
  };

  static decrypt = (param) => {
    const bytes = CryptoJS.AES.decrypt(param, SECRET_KEYB);
    return bytes.toString(CryptoJS.enc.Utf8);
  };
}

module.exports = CryptoHandler;