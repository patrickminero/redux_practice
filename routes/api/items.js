const express = require('express');
const router = express.Router();
//model
const Item = require('../../models/Item')
//@GET api/items
//get all items

router.get('/', (req, res) => {
  Item.find({})
  .sort({ date: -1})
  .then(items => res.json(items))
})

//@POST api/items
//create items

router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.data
  })
  newItem.save().then(item => res.json(item))
})

router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
  .then(item => item.remove()
  .then(() => res.status(202).json({success: true})))
  .catch(err => res.status(404).json({success: false}))
})

module.exports = router;