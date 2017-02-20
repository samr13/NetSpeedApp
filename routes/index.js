var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var devices = mongoose.model("devices");
var throughput = mongoose.model("throughput");

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/get_devices', function(req, res, next) {
    // can be used to find only ip_addr minus _id
    //    devices.find({}).select('ip_address -_id').exec(function(err, data)
    console.log("get devices");
    devices.find({}, function(err, data) {
        //res.send(data);
        res.json(data);
    });
});

router.get('/get_results', function(req, res, next) {
    // can be used to find only ip_addr minus _id
    //    devices.find({}).select('ip_address -_id').exec(function(err, data)
    console.log("get results");
    throughput.find({}, function(err, data) {
        //res.send(data);
        res.json(data);
    });
});

router.post('/start_test', function(req, res, next) {
    console.log("start test", req.body);
    if((req.body.ip_address_client=="127.0.0.1") &&
        (req.body.ip_address_server=="127.0.0.1")) {
        console.log("if");
        var spawn = require('child_process').spawn;
        var process = spawn('/usr/bin/python', ['public/scripts/test.py']);
        process.stdout.on('data', function (data) {
            console.log("script started, throughput: ", data.toString());
            throughput.create({
                ip_address_client: req.body.ip_address_client,
                ip_address_server: req.body.ip_address_server,
                throughput: data.toString()
            }, function (err, post) {
                if (err) return next(err);
                console.log(post);
                res.json(post);
            });
        });
    } else {
        devices.find({ip_address: req.body.ip_address_server}, function(err, data) {
            if (data.length) {
                data = data[0];
                console.log("server start", data.ip_address, data.username, data.password);
                var sc = require('child_process').spawn;
                var pc = sc('/usr/bin/python', ["public/scripts/scp.py", "public/scripts/iperfs.py", data.username, data.ip_address,  data.password ] );
                pc.stdout.on('data', function (data1) {
                    console.log("server start ssh", data1.toString());
                    var spawn1 = require('child_process').spawn;
                    spawn1('/usr/bin/python', ["public/scripts/ssh_test.py", data.ip_address, data.username, data.password, "/tmp/iperfs.py"]);
                    //client
                    devices.find({ip_address: req.body.ip_address_client}, function(err, data) {
                        if (data.length) {
                            data = data[0];
                            console.log("client start",  data.ip_address, data.username, data.password, req.body.ip_address_server, "10MB");
                            var sc = require('child_process').spawn;
                            var pc = sc('/usr/bin/python', ["public/scripts/scp.py", "public/scripts/iperfc.py", data.username, data.ip_address,  data.password ] );
                            pc.stdout.on('data', function (data1) {
                                console.log("client start ssh", data1.toString());
                                var spawn1 = require('child_process').spawn;
                                var process1 = spawn1('/usr/bin/python', ["public/scripts/ssh_test.py", req.body.ip_address_client, data.username, data.password, "/tmp/iperfc.py", req.body.ip_address_server, "10MB"]);
                                process1.stdout.on('data', function (data2) {
                                    console.log("client finish", data2.toString());
                                    throughput.create({
                                        ip_address_client: req.body.ip_address_client,
                                        ip_address_server: req.body.ip_address_server,
                                        throughput: data2.toString()
                                    }, function (err, post) {
                                        if (err) return next(err);
                                        res.json(post);
                                    });
                                });
                            });
                        }
                    });
                });
            }
        });






    }

});


module.exports = router;
