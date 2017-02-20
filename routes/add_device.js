var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var devices = mongoose.model("devices");

router.post('/', function(req, res, next) {
    //console.log("data: ",req.body.ip_address);
    //    var addDev = new devices({ip_address:req.body.ip_address});
    //    addDev.save(function(err) {
    //        if (err)
    //            console.log("error in hosting");
    //        else
    //            console.log("saved", req.body.ip_address);
    //    });
    console.log("add device", req.body.ip_address, req.body.username, req.body.password);
    devices.find({ip_address: req.body.ip_address}, function(err, data) {
        //if (!data.length)
            devices.create({ip_address: req.body.ip_address, username: req.body.username, password: req.body.password}, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
    });
});


module.exports = router;
