//编辑工程信息
angular.module('equipmentApp.controller').controller('enginneringServiceModifyModalCtrl',function ($scope,$uibModalInstance, items,deviceApi) {

    // console.log(items);
    $scope.updateEnginnering=items;
    console.log($scope.updateEnginnering)
    $scope.name= $scope.updateEnginnering.name;
    $scope.constructionLicenseCode= $scope.updateEnginnering.constructionLicenseCode;
    $scope.projectLeader=$scope.updateEnginnering.projectLeader;
    $scope.projectLeaderPhone=$scope.updateEnginnering.projectLeaderPhone;
    $scope.address =$scope.updateEnginnering.address;
    $scope.floorage=$scope.updateEnginnering.floorage;
    $scope.height =$scope.updateEnginnering.height, $scope.declarant=$scope.updateEnginnering.declarant;
    var date = new Date($scope.updateEnginnering.declarationDate);
    $scope.date={
        date:date
    }
    // $scope.updateEnginnering.primaryContractorCompany=$scope.primaryContractorCompany.selected.companyType,
    // $scope.updateEnginnering.constructionCompany=$scope.primaryContractorCompany.selected.companyType,
    // $scope.updateEnginnering.supervisingCompany=$scope.supervisingCompany.selected.companyType,
    // $scope.updateEnginnering.regulationCompany=$scope.regulationCompany.selected.companyType,
    // $scope.updateEnginnering.declarationCompany=$scope.declarationCompany.selected.companyType















    $scope.ok = function () {

        $uibModalInstance.close();
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})

