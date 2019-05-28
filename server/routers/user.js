const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

//This route is used to sign up new users
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch(e) {
        res.status(400).send(e);
    }

});

//This route is used to login in current users
router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({user, token});
    } catch(e) {
        console.log('error called here')
        res.status(400).send();
    }
    
});

//This route is to check the users profile
router.get('/users/me', auth, async (req, res) => {
    try {
        const user = req.user;
        if(!user) {
            throw new Error();
        }
        res.status(200).send(user);
    } catch(e) {
        res.status(400).send();
    }
});

//This route is to logout the user from current session
router.post('/users/logout', auth, async (req, res) => {
    try {
        const user = req.user;
        user.tokens = user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await user.save();
        
        res.send();
    } catch(e) {
        res.status(500).send();
    }
});

//This route is to logout out the user from all sessions and remove all tokens
router.post('/users/logoutall', auth, async (req, res) => {
    try {
        const user = req.user;
        user.tokens = [];
        await user.save();
        res.send();
    } catch(e) {
        res.status(500).send();
    }
})

//This route is used to delete the current user if authorized
router.delete('/users', async (req,res) => {
    try {
        const user = await User.findOneAndRemove({userName: req.body.userName});
        if(!user) {
            throw new Error();
        }
        res.status(200).send(user);
    } catch(e) {
        res.status(400).send();
    }

});

//This route is used to update authorized users profile
router.patch('/users', async (req, res) => {
   const updates = Object.keys(req.body);
   const allowedUpdates = ['userName', 'password', 'email'];
   const isValidOperation = updates.every((update) => {
       return allowedUpdates.includes(update);
   });

   if(!isValidOperation) {
       return res.status(400).send({error: "Invalid updates!"});
   }

   try {
       const user = await User.findOne({userName: req.body.userName});
       updates.forEach(update => user[update] = req.body[update]);
       await user.save();
       res.status(200).send(user);
   } catch(e) {
       res.status(400).send();
   }
});

module.exports = router;