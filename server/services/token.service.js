const jwt = require('jsonwebtoken')
const { SECRET_JWT } = process.env
console.log("🚀 ~ file: token.service.js ~ line 3 ~ SECRET_JWT", SECRET_JWT)

const sign = (user) => new Promise((resolve, reject) => {
    jwt.sign({ user }, SECRET_JWT, null, (err, decodedToken) => {
        err ? reject(err) : resolve(decodedToken)
    })
})

const verify = (token) => new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_JWT, null, (err, token) => {
        err ? reject(err) : resolve(token)
    })
})

module.exports = {
    sign,
    verify
}