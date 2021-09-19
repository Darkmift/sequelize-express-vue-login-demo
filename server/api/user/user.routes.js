
const { Router } = require('express');
const router = Router();

const authMiddleware = require('../../middleware/auth.middleware')
const { login, signup, getUsers } = require('./user.controller');

router.get('/', authMiddleware, getUsers);
router.post('/login', login);
router.post('/register', signup);


module.exports = router;