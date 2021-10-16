const {Router} = require('express');
const router = Router();
const controllers = require('../controllers/accountControll');

router.post('/signup', controllers.newUser);
router.post('/login', controllers.login);

module.exports = router;