const router = require('express').Router();
const withAuth = require('../utils/auth');
const { posts } = require('../models/index')

router.get('/', withAuth, async (req, res) => {
    try {
        const allPosts = await posts.findAll();

        const newPosts = allPosts.map((postList) => postList.get({ plain: true })
        );

        console.log(newPosts);

        res.render('homepage', {
            loggedIn: req.session.loggedIn,
            thisUser: req.session.thisUser,
            newPosts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    res.render('dashboard', {
        loggedIn: req.session.loggedIn,

        thisUser: req.session.thisUser
    })
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    };

    res.render('signup');
});

module.exports = router;