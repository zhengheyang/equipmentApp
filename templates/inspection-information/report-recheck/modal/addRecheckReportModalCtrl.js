angular.module('equipmentApp.controller')
    .controller('addRecheckReportModalCtrl', function ($uibModalInstance, items, $scope, deviceApi, Upload) {
        $scope.recheckData = {
            code: '',
            conclusionId: items.id,
            usingUnit: '',
            installAddress: '',
            recheckConclusion: '',
            inspectionUnitCertificateCode: '',
            remark: '',
            firstInspectionDisqualifiedReason: '',
            recheckResult: '',
            maintenanceStaff: '',
            recheckReportConclusionPageFile: ''
        };
        $scope.recheckDate = {
            date: ''
        };
        $scope.issueDate = {
            date: ''
        };
        $scope.nextIssueDate = {
            date: ''
        };
        $scope.maintenanceDate = {
            date: ''
        };


        $scope.ok = function () {
            $scope.recheckData.recheckDate = $scope.recheckDate.date.getFullYear() + '-' + ($scope.recheckDate.date.getMonth() + 1) + '-' + $scope.recheckDate.date.getDate();
            $scope.recheckData.issueDate = $scope.issueDate.date.getFullYear() + '-' + ($scope.issueDate.date.getMonth() + 1) + '-' + $scope.issueDate.date.getDate();
            $scope.recheckData.nextIssueDate = $scope.nextIssueDate.date.getFullYear() + '-' + ($scope.nextIssueDate.date.getMonth() + 1) + '-' + $scope.nextIssueDate.date.getDate();
            $scope.recheckData.maintenanceDate = $scope.maintenanceDate.date.getFullYear() + '-' + ($scope.maintenanceDate.date.getMonth() + 1) + '-' + $scope.maintenanceDate.date.getDate();
            // $scope.recheckData.recheckDate=$scope.recheckDate.date.toJSON();

            console.log($scope.recheckData)
            Upload.upload({
                url: 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/add',
                data: $scope.recheckData
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