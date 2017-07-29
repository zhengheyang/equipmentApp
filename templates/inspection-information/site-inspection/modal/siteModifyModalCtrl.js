angular.module('equipmentApp.controller')
    .controller('siteModifyModalCtrl', function ($uibModalInstance, Upload, items, $scope, deviceApi, $rootScope) {
        $scope.siteReportId = items.id;
        deviceApi.getReportMaterial($scope.siteReportId).then(function (data) {
            $scope.reportMaterial = data.data;
            console.log($scope.reportMaterial)
            for (var i = 0; i < $scope.reportMaterial.length; i++) {
                $scope.reportMaterial[i].fileCon = [];
            }
        }, function () {
        });


        $scope.ok = function () {


            for (var i = 0; i < $scope.reportMaterial.length; i++) {

                for (var j = 0; j < $scope.reportMaterial[i].fileCon.length; j++) {
                    Upload.upload({
                        url: 'http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/report-material/upload',
                        data: {
                            reportMaterialId: $scope.reportMaterial[i].id,
                            executionId: $scope.siteReportId,
                            materialFile: $scope.reportMaterial[i].fileCon[j].url,
                            position: j + 1
                        }
                    })
                        .success(function (data, status, headers, config) {
                            console.log('图片上传成功');
                            $rootScope.myPromise = deviceApi.postFinish($scope.siteReportId).then(function (data) {
                                // swal("上传成功!", "请确认!", "success")
                                $uibModalInstance.close();
                            }, function () {
                            });
                        })
                        .error(function (data, status, headers, config) {
                            console.log('error');
                        })

                }

            }
        }
        $scope.delThis = function (index) {

        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    });