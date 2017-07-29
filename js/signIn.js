angular.module('equipmentApp.controller')
//登录
    .controller('signInCtrl',function ($scope,deviceApi,$state,$rootScope) {
        $scope.adminland = function () {
            var username = $scope.username;
            var password = $scope.password;
            $rootScope.myPromise=deviceApi.adminLanding(username, password).then(function (data) {
                console.log(data);
                if (data.data.success == true) {
                    $state.go('main', {});
                }else {
                    swal("错误!", data.data.error.message+"!", "error")
                }
            },function () {
                swal("错误!", "网络错误，请重试!", "error")
            })
        }
    });