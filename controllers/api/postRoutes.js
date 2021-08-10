const router = require("./userRoutes");
const withAuth = require('../../utils/auth')
const { posts, user, comments } = require('../../models')

router.get('/:id', async (req, res) => {
    try {
        const thisPost = await posts.findByPk(req.params.id, {
            include: [{ all: true, nested: true }]
            // include: [{
            //     model: user,
            //     attributes: [ 'username', 'email' ]
            // }, {
            //     model: comments,
            //     required: true,
            //     include: [
            //         {
            //             model: user,
            //             as: 'commenter',
            //             required: true,
            //         }
            //     ]
            // }]
        })

        if (!thisPost) {
            res.status(404).json({ message: 'No patient with this ID' });
            return;
        }

        const currentPost = thisPost.get({ plain: true })

        // const commenters = currentPost.comments

        // const theseComments = await comments.findAll({
        //     where: {
        //         post_id: thisPost.id
        //     },
        //     include: {
        //         model: user,
        //         as: 'commenter'
        //     }
        // })
        
        // console.log(theseComments)

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