angular.module('equipmentApp.controller')
    .controller('writeReportModalCtrl', function ($uibModalInstance, items, $scope, deviceApi, Upload) {
        $scope.reportData = {
            executionId: items.id,
            code: '',
            deviceInstallAddress: '',
            factoryNumber: '',
            installLicenseCode: '',
            factory: '',
            manufacturingLicenseNumber: '',
            factoryDate: '',
            serviceLife: '',
            mountingHeight: '',
            maxSpecifiedWeight: '',
            maxLoadMoment: '',
            liftingSpeed: '',
            maxRadius: '',
            installRadius: '',
            derrickingSpeed: '',
            gantryTravelingSpeed: '',
            attachChannelCount: '',
            inspectionStandard: '',
            mainInspectionInstrument: '',
            inspectionConclusion: '',
            remark: '',
            nextInspectionDate: '',
            auditOfficer: '',
            auditDate: '',
            authorizingOfficer: '',
            authorizingDate: '',
            inspectionUnitCertificate: '',
            issueDate: '',
            inspectionReportConclusionPageFile: '',
            inspectionReportCoverPageFile: ''
        };
        $scope.factoryDate = {
            date: ''
        };
        $scope.nextInspectionDate = {
            date: ''
        };
        $scope.auditDate = {
            date: ''
        };
        $scope.authorizingDate = {
            date: ''
        };
        $scope.issueDate = {
            date: ''
        };
        $scope.ok = function () {
            $scope.reportData.factoryDate = $scope.factoryDate.date.getFullYear() + '-' + ($scope.factoryDate.date.getMonth() + 1) + '-' + $scope.factoryDate.date.getDate();
            $scope.reportData.nextInspectionDate = $scope.nextInspectionDate.date.getFullYear() + '-' + ($scope.nextInspectionDate.date.getMonth() + 1) + '-' + $scope.nextInspectionDate.date.getDate();
            $scope.reportData.auditDate = $scope.auditDate.date.getFullYear() + '-' + ($scope.auditDate.date.getMonth() + 1) + '-' + $scope.auditDate.date.getDate();
            $scope.reportData.authorizingDate = $scope.authorizingDate.date.getFullYear() + '-' + ($scope.authorizingDate.date.getMonth() + 1) + '-' + $scope.authorizingDate.date.getDate();
            $scope.reportData.issueDate = $scope.issueDate.date.getFullYear() + '-' + ($scope.issueDate.date.getMonth() + 1) + '-' + $scope.issueDate.date.getDate();
            // deviceApi.postAonclusionAdd($scope.reportData).then(function (data) {
            //     swal("上传成功!", "请确认!", "success")
            //     $uibModalInstance.close();
            // }, function () {
            // });
            console.log($scope.reportData)
            Upload.upload({
                url: 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/conclusion/add',
                data: $scope.reportData
            })
                .success(function (data, status, headers, config) {
                    swal("上传成功!", "请确认!", "success");
                    $uibModalInstance.close();
                })
                .error(function (data, status, headers, config) {
                    console.log('error');
                })
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });