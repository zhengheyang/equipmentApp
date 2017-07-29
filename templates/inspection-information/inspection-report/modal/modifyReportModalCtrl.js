angular.module('equipmentApp.controller')
    .controller('modifyReportModalCtrl', function ($uibModalInstance, items, $scope, Upload, deviceApi) {

        deviceApi.getReportMaterial(items.id).then(function (data) {
            $scope.reportMaterial = data.data;
            console.log($scope.reportMaterial)
        }, function () {
        });


        //现场检测图片展示
        deviceApi.getExecutionDetailAll(items.id).then(function (data) {
            $scope.executionDetail = data.data;
            console.log($scope.executionDetail)
            for (var j = 0; j < $scope.reportMaterial.length; j++) {
                $scope.reportMaterial[j].fileCon = [];
                for (var i = 0; i < $scope.executionDetail.execution.materialFiles.length; i++) {
                    if ($scope.executionDetail.execution.materialFiles[i].name == $scope.reportMaterial[j].name) {
                        for (var value in $scope.executionDetail.execution.materialFiles[i]) {
                            if (value != "name" && $scope.executionDetail.execution.materialFiles[i][value]) {
                                $scope.reportMaterial[j].fileCon.push({
                                    url: $scope.executionDetail.execution.materialFiles[i][value]
                                })
                            }
                        }
                    }

                }

            }
            console.log($scope.reportMaterial)

        }, function () {
        });
        $scope.ok = function () {


            for (var i = 0; i < $scope.reportMaterial.length; i++) {

                for (var j = 0; j < $scope.reportMaterial[i].fileCon.length; j++) {
                    console.log(123)
                    Upload.upload({
                        url: 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/report-material/upload',
                        data: {
                            reportMaterialId: $scope.reportMaterial[i].id,
                            executionId: $scope.executionDetail.execution.id,
                            materialFile: $scope.reportMaterial[i].fileCon[j].url,
                            position: j + 1
                        }
                    })
                        .success(function (data, status, headers, config) {
                            console.log('图片上传成功');
                            swal("上传成功!", "请确认!", "success")
                            $uibModalInstance.close();
                        })
                        .error(function (data, status, headers, config) {
                            console.log('error');
                        })

                }

            }
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    });