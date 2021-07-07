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

// login 

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!userData) {
            res.status(400).json({
                message: "Incorrect email or password. Please try again."
            });
            return;
        }

        const passwordIsValid = await userData.checkPassword(req.body.password);

        if (!passwordIsValid) {
            res.status(400).json({
                message: "Incorrect email or password. Please try again."
            })
            return;
        }

        req.session.save(() => {
            req.session.isLoggedIn = true;
            res.status(200).json({
                user: userData, message: "You have succesfully logged in"
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

