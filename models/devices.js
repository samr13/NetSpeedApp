var mongoose = require('mongoose');
var deviceSchema = new mongoose.Schema({
    ip_address: String,
    username: String,
    password: String
});
module.exports = mongoose.model('devices', deviceSchema);


var throughputSchema = new mongoose.Schema({
    ip_address_client: String,
    ip_address_server: String,
    throughput: String
});
module.exports = mongoose.model('throughput', throughputSchema);

