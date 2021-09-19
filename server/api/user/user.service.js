const db = require('../../models');
const User = db.User;
// const sequelize = User.sequelize;
const CryptoHandler = require('../../services/bcrypt.service')

const login = async ({ username, password }) => {
  try {

    const user = await User.findOne({
      where: { username, password },
    });
    if (!CryptoHandler.decrypt(password)) {
      console.log('bad pw')
      return [null, 'not authorized']
    }
    if (!user) return [null, 'not found']
    return [user, null]
  } catch (error) {
    console.log("🚀 ~ file: user.service.js ~ line 19 ~ login ~ error", error)
    return [null, error]
  }
};

const signup = async (userSignData) => {
  try {
    Object.assign(
      userSignData,
      { password: CryptoHandler.encrypt(userSignData.password) }
    )
    const user = await User.create(userSignData)
    return [user, null]
  } catch (error) {
    console.log("🚀 ~ file: user.service.js ~ line 33 ~ signup ~ error", error)
    return [null, error]
  }
};

const getUsers = async (userSignData) => {
  try {

    const users = await User.findAll({})
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