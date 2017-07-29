//检验人员
angular.module('equipmentApp.controller').controller('inspectionPersonCtrl',function ($scope,$uibModal,deviceApi) {
    deviceApi.getPersonList().then(function (data) {
        $scope.personListDetail=data;
        console.log( $scope.personListDetail)
    }, function () {
    });
    //添加检验人员模态框
    $scope.openAddPersonModal = function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/information-show/inspection-person/modal/inspection-person-add.html',
            controller: 'inspectionAddCtrl',
            resolve: {
                items: function () {
                    return
                }
            }
        }).result.then(function () {

        }, function () {

        });
    }

})