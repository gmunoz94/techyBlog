const router = require('express').Router();
const { comments } = require('../../models');
const { route } = require('./userRoutes');

router.post('/', async (req, res) => {
    try {
        const commentData = comments.create(req.body);

        res.status(200).json(commentData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const commentData = comments.destroy({
            where: {
                id: req.params.id
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No Comment to delete! '})
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;