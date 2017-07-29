angular.module('equipmentApp.controller')
    .controller('modifyApplicationModalCtrl', function ($uibModalInstance, items, $scope, deviceApi, Upload, $http, $rootScope) {
        deviceApi.getApplicationDetail(items.id).then(function (data) {
            $scope.applicationModifyDetail = data.data;
            console.log($scope.applicationModifyDetail)
        }, function () {
        });
        deviceApi.getEngineeringList().then(function (data) {
            $scope.engineeringList = data;
        }, function () {
        });
        deviceApi.getCompanyList().then(function (data) {
            $scope.companyList = data;
        }, function () {
        });
        deviceApi.getDeviceType().then(function (data) {
            $scope.deviceType = data;
            // console.log($scope.deviceType)
        }, function () {
        });

        $scope.files = [];
        //上传图片
        $scope.ok = function (file) {
            var newApplicationData = {
                id: $scope.applicationModifyDetail.id,
                iprCode: $scope.applicationModifyDetail.iprCode,
                deviceCode: $scope.applicationModifyDetail.deviceCode,
                deviceName: $scope.applicationModifyDetail.deviceName,
                specification: $scope.applicationModifyDetail.specification,
                declarant: $scope.applicationModifyDetail.declarant,
                adminId: '1',
                deviceTypeId: $scope.applicationModifyDetail.deviceType.id,
                applicationCompanyId: $scope.applicationModifyDetail.applicationCompany.id,
                projectId: $scope.applicationModifyDetail.project.id
            };
            console.log($scope.files)
            $rootScope.myPromise = deviceApi.postApplicationUpdate(newApplicationData).then(function (data) {
                swal("修改成功!", "请确认!", "success")
                $uibModalInstance.close();
            }, function () {
            });
            if ($scope.files[0]) {
                for (var i = 0; i < $scope.files.length; i++) {
                    Upload.upload({
                        url: 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/application-material/upload',
                        data: {
                            applicationId: $scope.applicationModifyDetail.id,
                            applicationMaterialId: $scope.applicationModifyDetail.deviceType.applicationMaterials[i].id,
                            materialFile: $scope.files[i]
                        }
                    })
                        .success(function (data, status, headers, config) {
                            console.log('图片上传成功');
                        })
                        .error(function (data, status, headers, config) {
                            console.log('error');
                        })
                }
            }
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })