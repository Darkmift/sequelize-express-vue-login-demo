const { CustomError } = require('../../utils/errorUtils');

const userService = require('./user.service');
const tokenService = require('../../services/token.service');
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const [user, error] = await userService.login({ username, password });
        console.log("🚀 ~ file: user.controller.js ~ line 9 ~ login ~ user", user)

        
        if (error || !user || !user.is_active) {
            throw new CustomError(401, error || 'authorization denied');
        }

        const token = await tokenService.sign(user);
        return res.json({ user, token })
    } catch (error) {
        next(error)
    }
};

const signup = async (req, res, next) => {
    try {
        const { username, password, first_name, last_name } = req.body;
        const userSignData = { username, password, first_name, last_name }
        for (const key in userSignData) {
            if (!userSignData[key]) throw new CustomError(400, 'missing data to create new user: ' + JSON.stringify(userSignData));
        }
        const [user, error] = await userService.signup(userSignData);
        if (error || !user) throw new CustomError(400, error);
        // if (!user) throw new CustomError(400, 'user signup failed');

        delete user.password;
        const token = await tokenService.sign(user);
        const loggedUser = user.get({ plain: true });
        return res.json({ user: loggedUser, token })
    } catch (error) {
        next(error)
    }
};

const getUsers = async (req, res) => {
    try {
        const [users, error] = await userService.getUsers()
        if (error) throw new CustomError(400, error);

        return res.json(users)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login,
    signup,
    getUsers
};