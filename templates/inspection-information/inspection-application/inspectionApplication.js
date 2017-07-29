angular.module('equipmentApp.controller')
//设备报检申请
    .controller('inspectionApplicationCtrl', function ($scope, deviceApi, Upload, $rootScope, $state) {
        var applicationOnInit = function () {
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

            $scope.applicationData = {
                iprCode: '',
                deviceCode: '',
                deviceName: '',
                specification: '',
                declarant: '',
                adminId: '1'
            };
            $scope.projects = {
                project: ''
            };
            $scope.companys = {
                company: ''
            };
            $scope.deviceTypes = {
                type: ''
            };
        };
        applicationOnInit();

        $scope.submitApplication = function () {
            $scope.applicationData.projectId = $scope.projects.project.id;
            $scope.applicationData.applicationCompanyId = $scope.companys.company.id;
            $scope.applicationData.deviceTypeId = $scope.deviceTypes.type.id;

            $rootScope.myPromise = deviceApi.postApplication($scope.applicationData).then(function () {
                deviceApi.getApplication().then(function (data) {
                    $scope.applicationId = data.data[0].id;
                    console.log($scope.applicationId)
                    for (var i = 0; i < $scope.deviceTypes.type.applicationMaterials.length; i++) {
                        Upload.upload({
                            url: 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/application-material/upload',
                            data: {
                                applicationId: $scope.applicationId,
                                applicationMaterialId: $scope.deviceTypes.type.applicationMaterials[i].id,
                                materialFile: $scope.deviceTypes.type.applicationMaterials[i].picFile
                            }
                        })
                            .success(function (data, status, headers, config) {
                                console.log('图片上传成功');
                                // swal("提交成功!", "请确认!", "success");
                                applicationOnInit();
                            })
                            .error(function (data, status, headers, config) {
                                console.log('error');
                            })
                    }
                }, function () {
                });
            }, function () {
            });
        };
    });