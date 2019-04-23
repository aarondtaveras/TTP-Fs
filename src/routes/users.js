var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', async(req,res) => {
  res.render('portfolio',{id: req.params.id});
});

module.exports = router;
