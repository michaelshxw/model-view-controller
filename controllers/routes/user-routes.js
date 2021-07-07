const router = require('express').Router();
const { User } = require('../../models')

// create new user 

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.isLoggedIn = true;
            res.status(200).json(userData);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});