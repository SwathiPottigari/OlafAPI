var express=require("express");
var router=express.Router();
var apiRoutes=require('./olafcontroller');


router.use(apiRoutes);

router.get("/",function(req,res){
    res.send("Welcome");
});

module.exports = router;