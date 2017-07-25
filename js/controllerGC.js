/**
 * Created by zhyang on 17-7-8.
 */
angular.module('equipmentApp.controllerGC', [])

// 高琛  上传  角色管理界面 控制器

    //登录
    .controller('singCtrl',function ($scope,deviceApi,$state,$rootScope) {
        $scope.adminland = function () {
            var username = $scope.username;
            var password = $scope.password;
            $rootScope.myPromise=deviceApi.adminLanding(username, password).then(function (data) {
                console.log(data);
                if (data.data.success == true) {
                    $state.go('main', {});
                }else {
                    swal("错误!", data.data.error.message+"!", "error")
                }
            },function () {
                swal("错误!", "网络错误，请重试!", "error")
            })
        }
    })

    .controller('roleManagementCtrl',function ($scope,$log,deviceApi,$uibModal) {


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
    .controller('ModalInstanceCtrl', function ($scope,$uibModalInstance, items,deviceApi) {

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
    .controller('ModalInstanceCtrl1', function ($scope,$uibModalInstance, items,deviceApi) {

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


    //管理员角色控制器
    .controller('adminManagementCtrl',function ($scope,$uibModal,deviceApi) {


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
    .controller('ModalManagementCtrl',function ($scope,deviceApi,items,$uibModalInstance) {

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
    .controller('ModalManagementCtrl1',function ($scope,deviceApi,items,$uibModalInstance) {
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

    //删除管理员信息模态框



    //安装单位控制器
    .controller("installUnitCtrl",function ($scope,$uibModal,deviceApi) {
        var getInstallUnit =function () {
            deviceApi.getInstallUnit().then(function (data) {
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
                templateUrl: 'templates/modal/install-unit-modal.html',
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
                templateUrl: 'templates/modal/install-unit-update.html',
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

    //产权单位控制器
    .controller("propertyUnitCtrl",function ($scope,$uibModal,deviceApi) {
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
                templateUrl: 'templates/modal/install-unit-modal.html',
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
                templateUrl: 'templates/modal/install-unit-update.html',
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

    //施工总承包单位控制器
    .controller("epcUnitCtrl",function ($scope,$uibModal,deviceApi) {
        var getInstallUnit =function () {
            deviceApi.getEpcUnit().then(function (data) {
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
                templateUrl: 'templates/modal/install-unit-modal.html',
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
                templateUrl: 'templates/modal/install-unit-update.html',
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

    //检验单位控制器
    .controller("inspectionUnitCtrl",function ($scope,$uibModal,deviceApi) {
        var getInstallUnit =function () {
            deviceApi.getInspectionUnit().then(function (data) {
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
                templateUrl: 'templates/modal/install-unit-modal.html',
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
                templateUrl: 'templates/modal/install-unit-update.html',
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

    //其它单位控制器
    .controller("otherUnitCtrl",function ($scope,$uibModal,deviceApi) {
        var getInstallUnit =function () {
            deviceApi.getOtherUnit().then(function (data) {
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
                templateUrl: 'templates/modal/install-unit-modal.html',
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
                templateUrl: 'templates/modal/install-unit-update.html',
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
    //添加公司信息模态框
    .controller("modalInstallCtrl",function ($scope,items,deviceApi) {

        $scope.items = items;
        $scope.adminManagementObj = {
            management:[
                {
                    id:1,
                    name:'安装单位'
                },
                {
                    id:2,
                    name:'产权单位'
                },
                {
                    id:3,
                    name:'施工总承包单位'
                },
                {
                    id:4,
                    name:'检验单位'
                },
                {
                    id:5,
                    name:'其他单位'
                }
            ]
        };
        $scope.unitNature = [
            {
                id:1,
                name:'安装单位'
            },
            {
                id:2,
                name:'产权单位'
            },
            {
                id:3,
                name:'施工总承包单位'
            },
            {
                id:4,
                name:'检验单位'
            },
            {
                id:5,
                name:'其他单位'
            }
        ]

    })


    //更新公司信息模态框
    .controller("addInstallCtrl",function ($scope,items,deviceApi) {

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