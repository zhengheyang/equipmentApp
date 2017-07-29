angular.module('equipmentApp.controller')
    .controller('waitAcceptedModalCtrl', function ($uibModalInstance, items, $scope, deviceApi, $rootScope) {
        deviceApi.getApplicationDetail(items.id).then(function (data) {
            $scope.applicationDetail = data.data;
            console.log($scope.applicationDetail);
        }, function () {
        });
        $scope.ok = function () {

            var acceptedData = {
                applicationId: $scope.applicationDetail.id,
                result: '1',
                adminId: '1'
            };

            $rootScope.myPromise = deviceApi.postAccepted(acceptedData).then(function (data) {
                // swal("受理成功!", "请确认!", "success")
                $uibModalInstance.close();
            }, function () {
            });
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });