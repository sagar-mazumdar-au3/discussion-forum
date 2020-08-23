const express = require('express');
const passport = require('passport');
const router = express.Router();
const CommentModel = require('../models/comment');

// POST save a Comment 
router.post('/', passport.authenticate('jwt', { session : false }), async (req, res, next) => {
    const { comment, topicID } = req.body;
    const { user } = req;

    try {
        const newComment = new CommentModel({ 
            comment,
            createrName: user.name,
            createrID: user.email,
            topicID 
        });  
        const savedComment = await newComment.save();

        res.status(201).send(savedComment);

    } catch (error) {
        res.status(400).send({error});
    }

});

// GET get Comments by topicID
router.get('/:topicID', async (req, res, next) => {
    const {topicID} = req.params;
try {
    const comments = await CommentModel.find({topicID}).sort({ $natural: -1 });
    res.status(200).send(comments);
} catch (error) {
    res.status(400).send({error});
}
})

module.exports = router;