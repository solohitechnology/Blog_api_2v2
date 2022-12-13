const router = require('express').Router();
const Post = require('../models/Post')
const User = require('../models/Users');
const bcrypt = require('bcrypt');


//UPDATE
router.put('/update', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSaltSync(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        try {
            const updateUser = await User.findByIdUpdate(req.params.id, {
                $set: req.body,
            },
                { new: true }
            );
            res.status(200).json(updateUser)
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json('you con update only your account!')
    }
});

//DELETE

router.delete('/delete', async (req, res) => {
    if (req.body.userId === req.params.id) {

        try {
        const user = User.findById(req.params.id);
        try {
            await Post.deleteMany({ username: user.username})
           await User.findByIdAndDelete(req.params.id)
            res.status(200).json(' user has been deleted...')
        } catch (err) {
            res.status(500).json(err);
        }

    }  catch (err) {
        res.status(500).json('user not found')
    }
    } else {
        res.status(401).json('you can delete only your account!')
    }
});

//GET USER
router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others} = user._doc;
      res.status(200).json(others)
    }catch (err) {

    }
})
module.exports = router;