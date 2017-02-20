/**
 * Created by root on 2/17/17.
 */

//function ValidateIPaddress(ipaddress)
//{
//    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
//    {
//        return (true);
//    }
//    alert("You have entered an invalid IP address!");
//    return (false);
//}

angular.module("WifiPerformance", ['ngRoute','ngResource'])
    .controller('wifiController',['$scope', '$http', function($scope, $http){
        $scope.jsVariable = 'Controller is working';
/*
        $scope.delete = function(post) {
            console.log("delete")
            $http.delete('/delete_ip/' + post.id).then(function() {
                load();
            });
        };
 */
        $scope.getDevices = function() {
            $http.get('/get_devices').then(function (data, status, headers, config) {
                $scope.devices = data.data;
            });
        };
        $scope.getDevices();

        $scope.getResultsHistory = function() {
            $http.get('/get_results').then(function (data, status, headers, config) {
                $scope.results = data.data;
            });
        };

        $scope.getResultsHistory();

        $scope.add_device = function() {
            console.log("add machine");
            var regex= /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (!(regex.test($scope.info.ip_address)))
            {
                alert("invalid ip");
                return;
            }
            $http({
                method: 'POST',
                url: '/add_device',
                data: {
                    ip_address: $scope.info.ip_address,
                    username: $scope.info.username,
                    password: $scope.info.password
                }
            }).then(function(response) {
                console.log("ip address added", response);
                //$scope.devices = $scope.devices + response.data;
                $scope.getDevices();
            }, function(error) {
                console.log(error);
            });
        };

        $scope.start_test = function() {
            console.log("start_test", $scope.ip_address_client.ip_address, $scope.ip_address_server.ip_address);
            $http({
                method: 'POST',
                url: '/start_test',
                data: {
                    ip_address_client: $scope.ip_address_client.ip_address,
                    ip_address_server: $scope.ip_address_server.ip_address
                }
            }).then(function(response) {
                console.log("iperf test completed", response);
                //$scope.results = response.data;
                $scope.getResultsHistory();
            }, function(error) {
                console.log(error);
            });
        };
    }]);




