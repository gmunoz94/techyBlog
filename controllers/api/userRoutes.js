const router = require('express').Router();
const { user } = require('../../models');



router.post('/register', async (req, res) => {
    try {
        const dbUserData = user.create(req.body);

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const dbUserData = await user.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again! '});
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again! '});
            return;
        }

        const thisUser = dbUserData.get({ plain: true })

        req.session.save(() => {
            req.session.loggedIn =true;

            req.session.thisUser = thisUser;

            console.log(thisUser);

            res
                .status(200)
                .json({ user: dbUserData, message: 'You are now logged in! '});
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;