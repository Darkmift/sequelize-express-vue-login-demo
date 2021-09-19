const bcrypt = require('bcryptjs');
const SECRET_KEYB = process.env.SECRET_KEYB;
const saltRounds = 10;

const CryptoHandler = {
  hash(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  },
  compare(password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, function (err, comparisonResult) {
        if (err) reject(err)
        resolve(comparisonResult)
      });
    })
  }
}

// class CryptoHandler {
//   constructor() {
//     if (!SECRET_KEYB || !SECRET_KEYB.length) {
//       throw new ErrorHandler(500, 'please see env');
//     }
//   }

//   static encrypt = (param) => {
//     const output = CryptoJS.AES.encrypt(param, SECRET_KEYB).toString();
//     return output;
//   };

//   static decrypt = (param) => {
//     const bytes = CryptoJS.AES.decrypt(param, SECRET_KEYB);
//     return bytes.toString(CryptoJS.enc.Utf8);
//   };
// }

module.exports = CryptoHandler;