//where all the routes will go

const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item');

//@route Get api/items
//@desc Get All items
//@access Public
router.get('/', (req, res) =>{
    Item.find()
    .sort({ date: -1})              // This sort is for the json data from the api... w/ this sorting, the list will be sorted by date created... 
    .then(items => res.json(items))
});

//@route POST api/items
//@desc Create a item
//@access Public
router.post('/', (req, res) =>{
    const newItem = new Item({
        name: req.body.name  //this needs to match the Schema 
    });

    newItem.save().then(item => res.json(item));
});

//@route DELETE api/items/:id
//@desc Create a post
//@access Public
router.delete('/:id', (req, res) =>{
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});



module.exports = router;