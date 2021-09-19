const db = require('../../models');
const User = db.User;
// const sequelize = User.sequelize;
const CryptoHandler = require('../../services/bcrypt.service')

function _removePassword(user) {
  const returnUser = JSON.parse(JSON.stringify(user))
  delete returnUser.password;

  return returnUser
}

const login = async ({ username, password }) => {
  try {

    const user = await User.findOne({
      where: { username },
    });
    if (!user) return [null, 'not found']

    // compare pw hash from user input vs db stored pw
    const hashResult = await CryptoHandler.compare(password, user.password)

    if (!hashResult) {
      return [null, 'not authorized']
    }

    return [_removePassword(user), null]
  } catch (error) {
    console.log("🚀 ~ file: user.service.js ~ line 19 ~ login ~ error", error)
    return [null, error]
  }
};

const signup = async (userSignData) => {
  try {

    const hashedPW = await CryptoHandler.hash(userSignData.password)
    userSignData.password = hashedPW

    const user = await User.create(userSignData)
    
    return [_removePassword(user), null]

  } catch (error) {
    console.log("🚀 ~ file: user.service.js ~ line 33 ~ signup ~ error", error)
    return [null, error]
  }
};

const getUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    })
    return [users, null]
  } catch (error) {
    console.log("🚀 ~ file: user.service.js ~ line 44 ~ getUsers ~ error", error)
    return [null, error]
  }
};


module.exports = {
  login,
  signup,
  getUsers
};