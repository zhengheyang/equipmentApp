angular.module('equipmentApp.controller').controller('engineeringServiceCtrl',function ($scope,$uibModal,deviceApi) {

// var getProjectList=function () {

    var getMessage=function () {

        deviceApi.getProjectList().then(function (data) {
            $scope.projectDetail=data;
            console.log( $scope.projectDetail)
        }, function () {
        });
    }
// }
    getMessage();
//添加工程信息模态框

    $scope.openAddModal = function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/information-show/engineering-service/modal/projectInfoAdd.html',
            controller: 'projectInfoAddCtrl',
            resolve: {
                items: function () {
                    return
                }
            }
        }).result.then(function () {

        }, function () {
            getMessage();
        });
    }

    //编辑工程信息模态框
    $scope.openModifyModal = function (index) {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/information-show/engineering-service/modal/enginnering-service-modify.html',
            controller: 'enginneringServiceModifyModalCtrl',
            resolve: {
                items: function () {
                    return $scope.projectDetail[index]
                }
            }
        }).result.then(function () {
            getMessage();
        }, function () {
            getMessage();
        });
    }

    //删除工程信息

    $scope.onRemoveButtonClick=function (index) {
        var deteleUnit = {
            id:$scope.projectDetail[index].id,
            adminId:1
        };
        deviceApi.deleteProjectList(deteleUnit).then(function () {
            swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this imaginary file!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                },
                function(){
                    swal("Deleted!", "Your imaginary file has been deleted.", "success");
                    getMessage();
                });

        })
    }
})
