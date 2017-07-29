angular.module('equipmentApp.controller')
    .controller('recheckModifyModalCtrl', function ($uibModalInstance, items, $scope, deviceApi) {
        deviceApi.getConclusionDetailAll(items.id).then(function (data) {
            $scope.conclusionDetailAll = data.data.conclusion;
            console.log($scope.conclusionDetailAll)

            $scope.datesFactoryDate = $scope.conclusionDetailAll.factoryDate;
            $scope.factoryDate = {date: $scope.datesFactoryDate};

            $scope.datesNextInspectionDate = $scope.conclusionDetailAll.nextInspectionDate;
            $scope.nextInspectionDate = {date: $scope.datesNextInspectionDate};

            $scope.datesAuditDate = $scope.conclusionDetailAll.auditDate;
            $scope.auditDate = {date: $scope.datesAuditDate};

            $scope.datesAuthorizingDate = $scope.conclusionDetailAll.authorizingDate;
            $scope.authorizingDate = {date: $scope.datesAuthorizingDate};

            $scope.datesIssueDate = $scope.conclusionDetailAll.issueDate;
            $scope.issueDate = {date: $scope.datesIssueDate};
        }, function () {
        });


        $scope.ok = function () {

            $scope.reportData = {
                executionId: items.id,
                code: $scope.conclusionDetailAll.code,
                deviceInstallAddress: $scope.conclusionDetailAll.deviceInstallAddress,
                factoryNumber: $scope.conclusionDetailAll.factoryNumber,
                installLicenseCode: $scope.conclusionDetailAll.installLicenseCode,
                factory: $scope.conclusionDetailAll.factory,
                manufacturingLicenseNumber: $scope.conclusionDetailAll.manufacturingLicenseNumber,
                serviceLife: $scope.conclusionDetailAll.serviceLife,
                mountingHeight: $scope.conclusionDetailAll.mountingHeight,
                maxSpecifiedWeight: $scope.conclusionDetailAll.maxSpecifiedWeight,
                maxLoadMoment: $scope.conclusionDetailAll.maxLoadMoment,
                liftingSpeed: $scope.conclusionDetailAll.liftingSpeed,
                maxRadius: $scope.conclusionDetailAll.maxRadius,
                installRadius: $scope.conclusionDetailAll.installRadius,
                derrickingSpeed: $scope.conclusionDetailAll.derrickingSpeed,
                gantryTravelingSpeed: $scope.conclusionDetailAll.gantryTravelingSpeed,
                attachChannelCount: $scope.conclusionDetailAll.attachChannelCount,
                inspectionStandard: $scope.conclusionDetailAll.inspectionStandard,
                mainInspectionInstrument: $scope.conclusionDetailAll.mainInspectionInstrument,
                inspectionConclusion: $scope.conclusionDetailAll.inspectionConclusion,
                remark: $scope.conclusionDetailAll.remark,
                auditOfficer: $scope.conclusionDetailAll.auditOfficer,
                authorizingOfficer: $scope.conclusionDetailAll.authorizingOfficer,
                inspectionUnitCertificate: $scope.conclusionDetailAll.inspectionUnitCertificate,
                inspectionReportConclusionPageFile: $scope.conclusionDetailAll.inspectionReportConclusionPageFilePath,
                inspectionReportCoverPageFile: $scope.conclusionDetailAll.inspectionReportCoverPageFilePath
            };
            // $scope.reportData.factoryDate = $scope.factoryDate.date.getFullYear() + '-' + ($scope.factoryDate.date.getMonth() + 1) + '-' + $scope.factoryDate.date.getDate();
            // $scope.reportData.nextInspectionDate = $scope.nextInspectionDate.date.getFullYear() + '-' + ($scope.nextInspectionDate.date.getMonth() + 1) + '-' + $scope.nextInspectionDate.date.getDate();
            // $scope.reportData.auditDate = $scope.auditDate.date.getFullYear() + '-' + ($scope.auditDate.date.getMonth() + 1) + '-' + $scope.auditDate.date.getDate();
            // $scope.reportData.authorizingDate = $scope.authorizingDate.date.getFullYear() + '-' + ($scope.authorizingDate.date.getMonth() + 1) + '-' + $scope.authorizingDate.date.getDate();
            // $scope.reportData.issueDate = $scope.issueDate.date.getFullYear() + '-' + ($scope.issueDate.date.getMonth() + 1) + '-' + $scope.issueDate.date.getDate();
            // $scope.reportData.factoryDate = $scope.factoryDate.toJSON();
            // $scope.reportData.nextInspectionDate =$scope.nextInspectionDate.toJSON();
            // $scope.reportData.auditDate = $scope.nextInspectionDate.toJSON();
            // $scope.reportData.authorizingDate = $scope.authorizingDate.toJSON();
            // $scope.reportData.issueDate = $scope.issueDate.toJSON();
            // console.log($scope.factoryDate)
            // console.log($scope.nextInspectionDate)
            // console.log($scope.auditDate)
            // console.log($scope.authorizingDate)
            // console.log($scope.issueDate)

            // console.log($scope.reportData)
            $uibModalInstance.close();

        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });