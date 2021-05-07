var express = require('express');
var router = express.Router();
var userController = require("../controllers/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/dontalk",function (req,res,next) {
  res.send("speech is silver and silent is gollogind")
})

router.post('/register',userController.addUser);
router.post('/login',userController.login);
router.get('/restrictedPage',userController.restrictedPage);

module.exports = router;
