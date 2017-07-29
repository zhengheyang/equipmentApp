//更新公司信息模态框
angular.module('equipmentApp.controller').controller("addInstallCtrl",function ($scope,items,deviceApi) {

    $scope.items = items;
    // console.log(items)
    $scope.name = items.name;
    $scope.address = items.address;
    $scope.businessLicenseCode = items.businessLicenseCode;
    $scope.qualificationCertificateCode = items.qualificationCertificateCode;
    $scope.safetyProductionLicenseCode = items.safetyProductionLicenseCode;
    var date = new Date(items.safetyProductionLicenseExpiryDate);
    $scope.date={
        date:date
    }
    $scope.legalRepresentative = items.legalRepresentative;
    $scope.legalRepresentativePhone = items.legalRepresentativePhone
})