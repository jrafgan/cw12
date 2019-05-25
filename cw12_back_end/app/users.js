const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();
const config = require('../config');
const axios = require('axios');
const nanoid = require('nanoid');

router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    user.generateToken();

    try {
        await user.save();
        return res.send({message: 'User registered ', user});
    } catch (error) {
        return res.status(400).send(error)
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'User does not exist'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Password incorrect'});
    }

    user.generateToken();

    await user.save();

    res.send({message: 'Login successful ', user});
});


router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Logged out'};
    if (!token) {
        return res.send(success);
    }
    const user = await User.findOne({token});
    if (!user) {
        return res.send(success)
    }
    user.generateToken();
    await user.save();
    return res.send(success);
});

router.post('/facebookLogin', async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {

        const response = await axios.get(debugTokenUrl);

        const responseData = response.data;

        if (responseData.data.error) {
            return res.status(500).send({error: 'Token incorrect'});
        }

        if (responseData.data.user_id !== req.body.id) {
            return res.status(500).send({error: 'User is wrong'});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if (!user) {

            user = new User({
                username: req.body.email || req.body.id,
                password: nanoid(),
                facebookId: req.body.id,
                name: req.body.name,
                image: req.body.picture.data.url
            });
        }

        user.generateToken();
        await user.save();
        return res.send({user: user});

    } catch (e) {
        return res.status(500).send({error: 'Something went wrong'});
    }
});

router.put('/', auth, async (req, res) => {


    req.user.password = req.body.password;

    await req.user.save();

    res.sendStatus(200);
});

module.exports = router;
