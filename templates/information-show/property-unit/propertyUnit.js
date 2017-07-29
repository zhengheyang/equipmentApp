

//产权单位控制器
angular.module('equipmentApp.controller').controller("propertyUnitCtrl",function ($scope,$uibModal,deviceApi) {
    var getInstallUnit =function () {
        deviceApi.getPropertyUnit().then(function (data) {
            $scope.installUnitArray = data.data.result.data;
            // console.log($scope.adminManagementArray)
            $scope.newInstallUnitArray = $scope.installUnitArray.slice(0,8)
            // console.log($scope.newAdminManagementArray)
        }, function (error) {
        });
    } ;
    getInstallUnit();

//添加公司信息模态框
    $scope.addUnitClick = function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/information-show/unit-modal/install-unit-modal.html',
            controller: 'modalInstallCtrl',
            resolve: {
                items: function () {
                    return $scope.newInstallUnitArray[0]
                }
            }
        }).result.then(function () {
            swal("上传成功!", "请确认!", "success");
            $uibModalInstance.dismiss('cancel');
        }, function () {
            $uibModalInstance.dismiss('cancel');
        });
    };

//更新公司信息模态框
    $scope.updateUnitClick = function (index) {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/information-show/unit-modal/install-unit-update.html',
            controller: 'addInstallCtrl',
            resolve: {
                items: function () {
                    return  $scope.newInstallUnitArray[index]
                }
            }
        }).result.then(function () {

        }, function () {

        });
    };


//删除公司信息

    $scope.deleteInstallUnit=function (index) {
        var deteleUnit = {
            id:$scope.newInstallUnitArray[index].id,
            adminId:1
        };
        deviceApi.deleteInstallUnit(deteleUnit).then(function () {
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
                    getInstallUnit();
                });

        })
    }

})
