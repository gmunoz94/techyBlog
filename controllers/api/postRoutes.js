const router = require("./userRoutes");
const withAuth = require('../../utils/auth')
const { posts, user, comments } = require('../../models')

router.post('/', async (req, res) => {
    try {
        const newPost = await posts.create(req.body);

        console.log(newPost);

        res.render('/', {
            loggedIn: req.session.loggedIn,
            thisUser: req.session.thisUser,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const thisPost = await posts.findByPk(req.params.id, {
            // include: [{ all: true, nested: true }]
            include: [{
                model: user,
                attributes: [ 'username', 'email' ]
            }, {
                model: comments,
                include: [
                    {
                        model: user,
                    }
                ]
            }]
        })

        if (!thisPost) {
            res.status(404).json({ message: 'No patient with this ID' });
            return;
        }

        const currentPost = thisPost.get({ plain: true })

        console.log(currentPost);

        res
            .render('post', {
                loggedIn: req.session.loggedIn,
                thisUser: req.session.thisUser,
                currentPost,
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;