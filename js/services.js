/**
 * Created by zhyang on 17-6-30.
 */
angular.module('equimentApp.services', [])
    .factory('deviceApi', function ($http, $q) {
        return {
            getEngineeringList: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/project/show?page=1&count=10&adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getCompanyList: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/company/show?page=1&count=20&companyType=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getDeviceType: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/device-type/show';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getApplication:function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/application/wait-accept?page=1&count=20';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            postApplication:function (data) {
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/application/add';
                $http({
                    method: "POST",
                    url: url,
                    data: data,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function successCallback() {
                    swal("提交成功!", "请确认!", "success")
                }, function errorCallback() {

                });
            },
            getApplicationDetail:function (id) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/application/detail?id='+id+'&adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            }
        }
    })


