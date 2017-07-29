angular.module('equipmentApp.controller')
    .controller('assignDetectionModalCtrl', function ($uibModalInstance, items, $scope, deviceApi, $rootScope) {
        deviceApi.getAcceptedDetail(items.id).then(function (data) {
            $scope.acceptedDetail = data.data;
            console.log($scope.acceptedDetail)
        }, function () {
        });
        deviceApi.getInspectorList().then(function (data) {
            $scope.inspectors = data.data;
            $scope.inspectorsData = {}
        }, function () {
        });

        $scope.ok = function () {
            var assignData = {
                acceptId: $scope.acceptedDetail.id,
                inspectorId: $scope.inspectorsData.inspector.id,
                adminId: '1',
            };
            $rootScope.myPromise = deviceApi.postAcceptAssign(assignData).then(function (data) {
                swal("受理成功!", "请确认!", "success")
                $uibModalInstance.close();
            }, function () {
            });
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });