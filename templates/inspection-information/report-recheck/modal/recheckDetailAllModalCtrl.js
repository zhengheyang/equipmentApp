angular.module('equipmentApp.controller')
    .controller('recheckDetailAllModalCtrl', function ($uibModalInstance, items, $scope, deviceApi) {
        deviceApi.getConclusionDetailAll(items.id).then(function (data) {
            $scope.applicationDetailAll = data.data.application;
            $scope.auditDetail = data.data.accept;
            $scope.executionDetail = data.data.execution;
            $scope.conclusionDetail = data.data.conclusion;
            console.log(data.data)

            $scope.imageArr = [];
            for (var i = 0; i <= $scope.executionDetail.materialFiles.length; i++) {
                $scope.imageArr.push([]);
                for (value in $scope.executionDetail.materialFiles[i]) {
                    if (value != 'name' && $scope.executionDetail.materialFiles[i][value]) {
                        $scope.imageArr[i].push(
                            {url: $scope.executionDetail.materialFiles[i][value]}
                        )

                    }
                }
            }
        }, function () {
        });
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });