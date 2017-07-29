angular.module('equipmentApp.controller')
    .controller('executionDetailsAllModalCtrl', function ($uibModalInstance, items, $scope, deviceApi) {


        deviceApi.getReportMaterial(items.id).then(function (data) {
            $scope.reportMaterial = data.data;
            // console.log($scope.reportMaterial)
        }, function () {
        });
        deviceApi.getExecutionDetailAll(items.id).then(function (data) {
            $scope.applicationDetailAll = data.data.application;
            $scope.auditDetail = data.data.accept;
            $scope.executionDetail = data.data.execution;
            // console.log(data.data)
            // console.log($scope.applicationDetailAll.materialFiles)
            console.log($scope.executionDetail)
            for (var j = 0; j < $scope.reportMaterial.length; j++) {
                $scope.reportMaterial[j].fileCon = [];
                for (var i = 0; i < $scope.executionDetail.materialFiles.length; i++) {
                    if ($scope.executionDetail.materialFiles[i].name == $scope.reportMaterial[j].name) {
                        for (var value in $scope.executionDetail.materialFiles[i]) {
                            if (value != "name" && $scope.executionDetail.materialFiles[i][value]) {
                                $scope.reportMaterial[j].fileCon.push({
                                    url: $scope.executionDetail.materialFiles[i][value]
                                })
                            }
                        }
                    }

                }

            }
        }, function () {
        });
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    });