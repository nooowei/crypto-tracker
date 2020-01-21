var express = require('express');
var router = express.Router();
var axios = require('axios');

// /api routes
router.get('/ping', function(req, res, next) {
    // axios.post('/login', user)
    //   .then(function(res){})
  res.json({"success" : true});
});

router.post('/login', function(req,res,next){
  res.json({msg: "Success!"});
})



module.exports = router;
