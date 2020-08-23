const express = require('express');
const passport = require('passport');
const router = express.Router();
const TopicModel = require('../models/topic');

// POST save a Topic 
router.post('/', passport.authenticate('jwt', { session : false }), async (req, res, next) => {
    const { topic, description } = req.body;
    const { user } = req;

    try {
        const newTopic = new TopicModel({ 
            topic, 
            description,
            createrName: user.name,
            createrID: user.email
        });  
        const savedTopic = await newTopic.save();

        res.status(201).send(savedTopic);

    } catch (error) {
        res.status(400).send({error});
    }

});

// GET get all Topics
router.get('/', async (req, res, next) => {
try {
    const topics = await TopicModel.find().sort({ $natural: -1 });
    res.status(200).send(topics);
} catch (error) {
    res.status(400).send({error});
}
})

module.exports = router;