//管理员角色控制器
angular.module('equipmentApp.controller').controller('adminManagementCtrl',function ($scope,$uibModal,deviceApi) {


    //角色获取
    deviceApi.getRoleManagement().then(function (data) {
        $scope.roleManagementArray = data.data.result.data;
    }, function (error) {
    });

    //获取管理员请求
    var getAdminManagement =function () {
        deviceApi.getAdminManagement().then(function (data) {
            $scope.adminManagementArray = data.data.result.data;
            // console.log($scope.adminManagementArray)
            $scope.newAdminManagementArray = $scope.adminManagementArray.slice(0,8)
            // console.log($scope.newAdminManagementArray)
        }, function (error) {
        });
    } ;
    getAdminManagement();


//删除管理员信息

    $scope.deleteAdminManagement=function (index) {
        var deteleAdmin = {
            id:$scope.newAdminManagementArray[index].id,
            adminId:1
        };
        deviceApi.deleteAdminManagement(deteleAdmin).then(function () {
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
                    getAdminManagement();
                });
        })
    }

//添加管理员角色模态框

    $scope.onAddButtonClick = function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addModalContent.html',
            controller: 'ModalManagementCtrl',
            resolve: {
                items: function () {
                    return $scope.roleManagementArray
                }
            }
        }).result.then(function () {
            getAdminManagement();
        }, function () {

        });
    };



//更新管理员角色模态框
    $scope.onUpdateButtonClick = function (index) {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'updateModalContent.html',
            controller: 'ModalManagementCtrl1',
            resolve: {
                items: function () {
                    return $scope.newAdminManagementArray[index]
                }
            }
        }).result.then(function () {
            getAdminManagement();
        }, function () {

        });

    };



})



//添加管理员信息模态框
angular.module('equipmentApp.controller').controller('ModalManagementCtrl',function ($scope,deviceApi,items,$uibModalInstance) {

        $scope.adminManagementArray = items;
        $scope.adminManagementObj = {
            management:''
        }

        $scope.addAdminManagement = function () {
            console.log($scope.adminManagementObj.management)
            var addAdminManagement = {
                username:$scope.username,
                password:$scope.password,
                phone:$scope.phone,
                roleId:$scope.adminManagementObj.management.id,
                adminId:1
            }
            deviceApi.addAdminManagement(addAdminManagement).then(function () {
                swal("上传成功!", "请确认!", "success");
                $uibModalInstance.close();
            }, function (error) {
            });
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
    })


    //更新管理员信息模态框
angular.module('equipmentApp.controller').controller('ModalManagementCtrl1',function ($scope,deviceApi,items,$uibModalInstance) {
        $scope.adminManagement = items;
        $scope.adminManagementObj = {
            management: ''
        };
        $scope.username = $scope.adminManagement.username;
        $scope.phone = $scope.adminManagement.phone;
        $scope.adminManagementObj.management = $scope.adminManagement.role;

        $scope.addAdminManagement = function () {
            var addAdminManagement = {
                id: $scope.adminManagement.id,
                phone: $scope.phone,
                roleId: $scope.adminManagementObj.management.id,
                adminId: 1
            };

            deviceApi.updateAdminManagement(addAdminManagement).then(function () {
                swal("上传成功!", "请确认!", "success");
                $uibModalInstance.close();
            }, function (error) {
            });
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }
        }
    })
