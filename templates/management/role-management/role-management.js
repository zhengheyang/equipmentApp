// 高琛  上传  角色管理界面 控制器

angular.module('equipmentApp.controller').controller('roleManagementCtrl',function ($scope,$log,deviceApi,$uibModal) {


//角色信息请求
    var getRoleManagement =function () {
        deviceApi.getRoleManagement().then(function (data) {
            $scope.roleManagementArray = data.data.result.data;
            // console.log($scope.roleManagementArray )
            $scope.newRoleManagementArray = $scope.roleManagementArray.slice(0,3)
            // console.log($scope.newRoleManagementArray)
        }, function (error) {
        });
    } ;
    getRoleManagement();


//角色权限总览
    $scope.items = [
        {
            id:1,
            name:'设备检验申请',
            ischecked:false
        },
        {
            id:2,
            name:'检验单位审核',
            ischecked:false
        },
        {
            id:3,
            name:'检验单位检验准备',
            ischecked:false
        },
        {
            id:4,
            name:'现场检验',
            ischecked:false
        },
        {
            id:5,
            name:'检验报告',
            ischecked:false
        },
        {
            id:6,
            name:'单位管理',
            ischecked:false
        },
        {
            id:7,
            name:'人员管理',
            ischecked:false
        },
        {
            id:8,
            name:'工程管理',
            ischecked:false
        },
        {
            id:9,
            name:'管理员管理',
            ischecked:false
        },
        {
            id:10,
            name:'设备类型管理',
            ischecked:false
        },
        {
            id:11,
            name:'角色管理',
            ischecked:false
        },
        {
            id:12,
            name:'安全检验合格证',
            ischecked:false
        },
        {
            id:13,
            name:'检验报告复检',
            ischecked:false
        }

    ];

//添加角色模态框
    $scope.openModifyModal = function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function () {
                    return $scope.items
                }
            }
        }).result.then(function () {

            getRoleManagement();
        }, function () {
            $scope.items.map(function (index) {
                index.ischecked = false;
            })
        });

    };


//更新角色模态框
    $scope.openModifyModal1 = function (index) {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent1.html',
            controller: 'ModalInstanceCtrl1',
            resolve: {
                items: function () {
                    return $scope.newRoleManagementArray[index]
                }
            }
        }).result.then(function () {

            getRoleManagement();
            console.log(123)
        }, function () {
            // getRoleManagement();
            console.log(456)
        });

    }


//删除角色
    $scope.deleterole = function (index) {

        var deleteArray = {
            id:$scope.newRoleManagementArray[index].id,
            adminId:1
        }

        deviceApi.deleteRoleManagement(deleteArray).then(function (data) {
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
            getRoleManagement();
        }, function () {
        });
    }
})


//添加角色控制器
angular.module('equipmentApp.controller').controller('ModalInstanceCtrl', function ($scope,$uibModalInstance, items,deviceApi) {

        $scope.items = items;
        $scope.addRole = function () {
            var newPermissions = [];
            items.map(function (index) {
                if(index.ischecked == true){
                    newPermissions.push(index.id)
                }
            })
            var postArray = {
                name:$scope.roleName,
                permissionsId:newPermissions,
                adminId:1
            }

            deviceApi.postRoleManagement(postArray).then(function () {
                swal("已添加", "角色已添加!", "success");
                $uibModalInstance.close('cancel');
                items.map(function (index) {
                    index.ischecked = false;
                })
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
            items.map(function (index) {
                index.ischecked = false;
            })

        };
    })


    //更新角色控制器
angular.module('equipmentApp.controller').controller('ModalInstanceCtrl1', function ($scope,$uibModalInstance, items,deviceApi) {

        $scope.newRoleManagementArray = items;

        $scope.items = [
            {
                id:1,
                name:'设备检验申请',
                ischecked:false
            },
            {
                id:2,
                name:'检验单位审核',
                ischecked:false
            },
            {
                id:3,
                name:'检验单位检验准备',
                ischecked:false
            },
            {
                id:4,
                name:'现场检验',
                ischecked:false
            },
            {
                id:5,
                name:'检验报告',
                ischecked:false
            },
            {
                id:6,
                name:'单位管理',
                ischecked:false
            },
            {
                id:7,
                name:'人员管理',
                ischecked:false
            },
            {
                id:8,
                name:'工程管理',
                ischecked:false
            },
            {
                id:9,
                name:'管理员管理',
                ischecked:false
            },
            {
                id:10,
                name:'设备类型管理',
                ischecked:false
            },
            {
                id:11,
                name:'角色管理',
                ischecked:false
            },
            {
                id:12,
                name:'安全检验合格证',
                ischecked:false
            },
            {
                id:13,
                name:'检验报告复检',
                ischecked:false
            },

        ];
        for(var i=0;i<$scope.items.length;i++){
            for(var j=0;j<$scope.newRoleManagementArray.permissions.length;j++){
                if($scope.newRoleManagementArray.permissions[j].id ==$scope.items[i].id){
                    $scope.items[i].ischecked = true;
                }
            }
        }
        $scope.rolename = $scope.newRoleManagementArray.name;

        $scope.addRole = function (){

            var newPermissions = [];
            $scope.items.map(function (index) {
                if(index.ischecked == true){
                    newPermissions.push(index.id)
                }
            });
            var editArray = {
                name:$scope.rolename,
                permissionsId:newPermissions,
                id:$scope.newRoleManagementArray.id,
                adminId:1
            };
            deviceApi.editRoleManagement(editArray).then(function (data) {
                swal("修改成功!", "请确认!", "success")
                $uibModalInstance.close();
            }, function () {
            });
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');

        };

    })

// 角色管理界面  结束标志