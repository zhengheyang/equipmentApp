angular.module('equipmentApp.controller', []);
angular.module('equipmentApp.controller')
    .controller('mainCtrl', function ($scope, $state) {
        $.getScript('libs/dashboard-demo/js/jquery.slimscroll.min.js');
        $.getScript('libs/dashboard-demo/js/simplify/simplify.js');
        $scope.exitApp = function () {
            swal({
                    title: "退出",
                    text: "确认要退出吗？",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#8CD4F5",
                    confirmButtonText: "是",
                    cancelButtonText: "否",
                    closeOnConfirm: false
                },
                function () {
                    $state.go('signin', {});
                });
        }
    });
angular.module('equipmentApp.controller')
//登录
    .controller('signInCtrl',function ($scope,deviceApi,$state,$rootScope) {
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
    });
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

//施工总承包单位控制器
angular.module('equipmentApp.controller').controller("epcUnitCtrl",function ($scope,$uibModal,deviceApi) {
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

//设备类型管理
angular.module('equipmentApp.controller').controller('equipmentCtrl',function ($scope,$uibModal,deviceApi) {
    deviceApi.getEquipmentMessage().then(function (data) {
        $scope.equipmentDetail=data;
        console.log($scope.equipmentDetail)

    },function () {

    })
    //添加模态框
    $scope.openAddEquipment=function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/information-show/equipment-service/modal/equipment-add.html',
            controller: 'equipmentAddCtrl',
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

//检验单位控制器
angular.module('equipmentApp.controller').controller("inspectionUnitCtrl",function ($scope,$uibModal,deviceApi) {
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
            templateUrl: 'templates/information-show/inspection-unit/modal/install-unit-modal.html',
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
            templateUrl: 'templates/information-show/inspection-unit/modal/install-unit-update.html',
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
//安装单位控制器
angular.module('equipmentApp.controller').controller("installUnitCtrl",function ($scope,$uibModal,deviceApi) {
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

//其它单位控制器
angular.module('equipmentApp.controller').controller("otherUnitCtrl",function ($scope,$uibModal,deviceApi) {
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

//塔机司机
angular.module('equipmentApp.controller').controller('qtzDriverCtrl',function ($scope,$uibModal,deviceApi) {
    deviceApi.getDriverMessage().then(function (data) {
        $scope.qtzDriverDetail=data;
        console.log(data)
        console.log( $scope.qtzDriverDetail)
    }, function () {
    });
    //添加塔机司机模态框
    $scope.openAddDriver = function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/information-show/qtz-driver/modal/qtz-driver-add.html',
            controller: 'driverCtrl',
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

//塔机索工
angular.module('equipmentApp.controller').controller('qtzWorkerCtrl',function ($scope,$uibModal,deviceApi) {
    deviceApi.getWorkerMessage().then(function (data) {
        $scope.workerListDetail=data;
        console.log($scope.workerListDetail)
    },function () {

    })
    //添加模态框
    $scope.openAddWorker=function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/information-show/qtz-worker/modal/qtz-worker-add.html',
            controller: 'workerCtrl',
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

//安全员
angular.module('equipmentApp.controller').controller('safetyCtrl',function ($scope,$uibModal,deviceApi) {
    deviceApi.getSaferMessage().then(function (data) {
        $scope.safetyDetail=data;
        console.log($scope.safetyDetail)
    },function () {

    })
    //添加模态框
    $scope.openAddSafety=function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/information-show/safety-officer/modal/safety-add.html',
            controller: 'safetyAddCtrl',
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
//添加公司信息模态框
angular.module('equipmentApp.controller').controller("modalInstallCtrl",function ($scope,items,deviceApi) {

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
angular.module('equipmentApp.controller')
    .controller('certificateCtrl', function ($scope, deviceApi, $uibModal) {
        var recheckConclusionDataOnInit = function (page) {
            deviceApi.getRecheckConclusion(page).then(function (data) {
                $scope.recheckConclusionData = data.data;
                $scope.totalData = data.total;
                //分页.start
                $scope.totalItems = $scope.totalData;
                $scope.currentPage = 1;
                //分页.end
                console.log($scope.recheckConclusionData)
            }, function () {
            })
        };
        recheckConclusionDataOnInit(1); //默认显示第一页
        //切换页面.start
        $scope.changePage = function () {
            deviceApi.getExecution($scope.currentPage).then(function (data) {
                $scope.recheckConclusionData = data.data;
            }, function () {
            })
        };
        //切换页面.end
        // 合格证模态框
        $scope.openCertificateModal = function (index) {

            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/inspection-information/certificate/modal/certificate.html',
                controller: 'certificateModalCtrl',
                resolve: {
                    items: function () {
                        return $scope.recheckConclusionData[index]
                    }
                }
            }).result.then(function () {
                recheckConclusionDataOnInit(1);
            }, function () {
            });

        };
        //合格证详情模态框
        $scope.openDetailsModal = function (index) {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/inspection-information/certificate/modal/certificate-detail.html',
                controller: 'certificateDetailModalCtrl',
                resolve: {
                    items: function () {
                        return $scope.recheckConclusionData[index]
                    }
                }
            }).result.then(function () {
                recheckConclusionDataOnInit(1);
            }, function () {
            });

        }

    });
angular.module('equipmentApp.controller')
    .controller('detectionPrepareCtrl', function ($scope, deviceApi, $uibModal) {
        var waitAssignDataOnInit = function (page) {
            deviceApi.getWaitAssign(page).then(function (data) {
                $scope.waitAssignData = data.data;
                $scope.totalData = data.total;
                //分页.start
                $scope.totalItems = $scope.totalData;
                $scope.currentPage = 1;
                //分页.end
            }, function () {
            })
        };
        waitAssignDataOnInit(1); //默认显示第一页
        //切换页面.start
        $scope.changePage = function () {
            deviceApi.getWaitAssign($scope.currentPage).then(function (data) {
                $scope.waitAssignData = data.data;
            }, function () {
            })
        };
        //切换页面.end

        // assign-moda.start
        $scope.openAssignModal = function (index) {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/inspection-information/detection-prepare/modal/assign-detection.html',
                controller: 'assignDetectionModalCtrl',
                resolve: {
                    items: function () {
                        return $scope.waitAssignData[index]
                    }
                }
            }).result.then(function () {
                waitAssignDataOnInit(1);
            }, function () {
            });
        };
        // assign-moda.end
        //details-modal.start
        $scope.openDetailsModal = function (index) {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/inspection-information/detection-prepare/modal/accept-detail-all.html',
                controller: 'acceptDetailAllModalCtrl',
                resolve: {
                    items: function () {
                        return $scope.waitAssignData[index]
                    }
                }
            }).result.then(function () {
            }, function () {
            });
        };
        //details-modal.end
    });
angular.module('equipmentApp.controller')
//设备报检申请
    .controller('inspectionApplicationCtrl', function ($scope, deviceApi, Upload, $rootScope, $state) {
        var applicationOnInit = function () {
            deviceApi.getEngineeringList().then(function (data) {
                $scope.engineeringList = data;
            }, function () {
            });
            deviceApi.getCompanyList().then(function (data) {
                $scope.companyList = data;
            }, function () {
            });
            deviceApi.getDeviceType().then(function (data) {
                $scope.deviceType = data;
                // console.log($scope.deviceType)
            }, function () {
            });

            $scope.applicationData = {
                iprCode: '',
                deviceCode: '',
                deviceName: '',
                specification: '',
                declarant: '',
                adminId: '1'
            };
            $scope.projects = {
                project: ''
            };
            $scope.companys = {
                company: ''
            };
            $scope.deviceTypes = {
                type: ''
            };
        };
        applicationOnInit();

        $scope.submitApplication = function () {
            $scope.applicationData.projectId = $scope.projects.project.id;
            $scope.applicationData.applicationCompanyId = $scope.companys.company.id;
            $scope.applicationData.deviceTypeId = $scope.deviceTypes.type.id;

            $rootScope.myPromise = deviceApi.postApplication($scope.applicationData).then(function () {
                deviceApi.getApplication().then(function (data) {
                    $scope.applicationId = data.data[0].id;
                    console.log($scope.applicationId)
                    for (var i = 0; i < $scope.deviceTypes.type.applicationMaterials.length; i++) {
                        Upload.upload({
                            url: 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/application-material/upload',
                            data: {
                                applicationId: $scope.applicationId,
                                applicationMaterialId: $scope.deviceTypes.type.applicationMaterials[i].id,
                                materialFile: $scope.deviceTypes.type.applicationMaterials[i].picFile
                            }
                        })
                            .success(function (data, status, headers, config) {
                                console.log('图片上传成功');
                                // swal("提交成功!", "请确认!", "success");
                                applicationOnInit();
                            })
                            .error(function (data, status, headers, config) {
                                console.log('error');
                            })
                    }
                }, function () {
                });
            }, function () {
            });
        };
    });
angular.module('equipmentApp.controller')
    .controller('inspectionReportCtrl', function ($scope, deviceApi, $uibModal) {
        var waitConcludeDataOnInit = function (page) {
            deviceApi.getWaitConclude(page).then(function (data) {
                $scope.waitConcludeData = data.data;
                $scope.totalData = data.total;
                //分页.start
                $scope.totalItems = $scope.totalData;
                $scope.currentPage = 1;
                //分页.end
                console.log($scope.waitConcludeData)
            }, function () {
            })
        };
        waitConcludeDataOnInit(1); //默认显示第一页
        //切换页面.start
        $scope.changePage = function () {
            deviceApi.getExecution($scope.currentPage).then(function (data) {
                $scope.waitConcludeData = data.data;
            }, function () {
            })
        };
        //切换页面.end

        $scope.state = [{
            name: '未结论',
        }, {
            name: '已结论'
        }];
        //modify-modal
        $scope.openModifyModal = function (index) {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/inspection-information/inspection-report/modal/modify-report.html',
                controller: 'modifyReportModalCtrl',
                resolve: {
                    items: function () {
                        return $scope.waitConcludeData[index]
                    }
                }
            }).result.then(function () {
                waitConcludeDataOnInit(1);
            }, function () {
            });
        };
        //writeReport-modal
        $scope.openWriteReportModal = function (index) {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/inspection-information/inspection-report/modal/write-report.html',
                controller: 'writeReportModalCtrl',
                resolve: {
                    items: function () {
                        return $scope.waitConcludeData[index]
                    }
                }
            }).result.then(function () {
                waitConcludeDataOnInit(1);
            }, function () {
            });
        };
        //details-modal
        $scope.openDetailsModal = function (index) {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/inspection-information/inspection-report/modal/execution-details-all.html',
                controller: 'executionDetailsAllModalCtrl',
                resolve: {
                    items: function () {
                        return $scope.waitConcludeData[index]
                    }
                }
            }).result.then(function () {
            }, function () {
            });
        };
    });
angular.module('equipmentApp.controller')
    .controller('inspectionUnitAuditCtrl', function ($scope, deviceApi, $uibModal, $rootScope, $http) {
        var applicationOnInit = function (page) {
            deviceApi.getApplication().then(function (data) {
                $scope.applicationArray = data.data;
                $scope.totalData = data.total;
                //分页.start
                $scope.totalItems = $scope.totalData;
                $scope.currentPage = 1;
                //分页.end
            }, function () {
            })
        };
        applicationOnInit(1);
        //切换页面.start
        $scope.changePage = function () {
            deviceApi.getWaitAssign($scope.currentPage).then(function (data) {
                $scope.waitAssignData = data.data;
            }, function () {
            })
        };
        //切换页面.end

        //modify-modal
        $scope.openModifyModal = function (index) {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/inspection-infomation/inspection-unit-audit/modal/modify-application.html',
                controller: 'modifyApplicationModalCtrl',
                resolve: {
                    items: function () {
                        return $scope.applicationArray[index]
                    }
                }
            }).result.then(function () {
                applicationOnInit(1);
            }, function () {
            });
        };
        //accepted-modal
        $scope.openAcceptedModal = function (index) {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/inspection-infomation/inspection-unit-audit/modal/wait-accepted.html',
                controller: 'waitAcceptedModalCtrl',
                resolve: {
                    items: function () {
                        return $scope.applicationArray[index]
                    }
                }
            }).result.then(function () {
                applicationOnInit();
            }, function () {
            });
        };
        //details-modal
        $scope.openDetailsModal = function (index) {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/inspection-infomation/inspection-unit-audit/modal/accepted-details.html',
                controller: 'acceptedDetailsModalCtrl',
                resolve: {
                    items: function () {
                        return $scope.applicationArray[index]
                    }
                }
            }).result.then(function () {
            }, function () {
            });
        };

    });
angular.module('equipmentApp.controller')
    .controller('reportRecheckCtrl', function ($scope, deviceApi, $uibModal) {
        var waitRecheckDataOnInit = function (page) {
            deviceApi.getWaitRecheck(page).then(function (data) {
                $scope.waitRecheckData = data.data;
                $scope.totalData = data.total;
                //分页.start
                $scope.totalItems = $scope.totalData;
                $scope.currentPage = 1;
                //分页.end
                console.log($scope.waitRecheckData)
            }, function () {
            })
        };
        waitRecheckDataOnInit(1); //默认显示第一页
        //切换页面.start
        $scope.changePage = function () {
            deviceApi.getExecution($scope.currentPage).then(function (data) {
                $scope.waitRecheckData = data.data;
            }, function () {
            })
        };
        //切换页面.end

        $scope.state = [{
            name: '未复检',
        }, {
            name: '已复检'
        }];
        //modify-modal.start
        $scope.openModifyModal = function (index) {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/inspection-information/report-recheck/modal/recheck-modify.html',
                controller: 'recheckModifyModalCtrl',
                resolve: {
                    items: function () {
                        return $scope.waitRecheckData[index]
                    }
                }
            }).result.then(function () {
                waitRecheckDataOnInit(1);
            }, function () {
            });
        };
        //modify-modal.end
        //addReport-modal.start
        $scope.addRecheckReportModal = function (index) {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/inspection-information/report-recheck/modal/add-recheck-report.html',
                controller: 'addRecheckReportModalCtrl',
                resolve: {
                    items: function () {
                        return $scope.waitRecheckData[index]
                    }
                }
            }).result.then(function () {
                waitRecheckDataOnInit(1);
            }, function () {
            });
        };
        //addReport-modal.end

        //details-modal.start
        $scope.openDetailsModal = function (index) {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/inspection-information/report-recheck/modal/recheck-detail-all.html',
                controller: 'recheckDetailAllModalCtrl',
                resolve: {
                    items: function () {
                        return $scope.waitRecheckData[index]
                    }
                }
            }).result.then(function () {
                waitRecheckDataOnInit(1);
            }, function () {
            });
        };
        //details-modal.end
    });

angular.module('equipmentApp.controller')
    .controller('siteInspectionCtrl', function ($scope, deviceApi, $uibModal, $http) {
        var executionDataOnInit = function (page) {
            deviceApi.getExecution(page).then(function (data) {
                $scope.executionData = data.data;
                // console.log($scope.executionData)
                $scope.totalData = data.total;
                //分页.start
                $scope.totalItems = $scope.totalData;
                $scope.currentPage = 1;
                //分页.end
            }, function () {
            })
        };
        executionDataOnInit(1); //默认显示第一页
        //切换页面.start
        $scope.changePage = function () {
            deviceApi.getExecution($scope.currentPage).then(function (data) {
                $scope.executionData = data.data;
            }, function () {
            })
        };
        //切换页面.end

        $scope.state = [{
            name: '待检验',
        }, {
            name: '已检验'
        }];
        //modift-modal.start
        $scope.openModifyModal = function (index) {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/inspection-information/site-inspection/modal/site-modify.html',
                controller: 'siteModifyModalCtrl',
                resolve: {
                    items: function () {
                        return $scope.executionData[index]
                    }
                }
            }).result.then(function () {
                executionDataOnInit(1);
            }, function () {
            });
        };
        //modift-modal.end
        //details-modal.start
        $scope.openDetailsModal = function (index) {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/inspection-information/site-inspection/modal/execution-detail-all.html',
                controller: 'executionDetailAllModalCtrl',
                resolve: {
                    items: function () {
                        return $scope.executionData[index]
                    }
                }
            }).result.then(function () {
            }, function () {
            });
        };
        //details-modal.end


        this.log = function (text) {
            var startDate = null;
            if (startDate) {
                startDate = text.startDate.getFullYear() + '-' + (text.startDate.getMonth() + 1) + '-' + text.startDate.getDate();
            }
            var endDate = text.endDate.getFullYear() + '-' + (text.endDate.getMonth() + 1) + '-' + text.endDate.getDate();
            var keywords = text.keywords;

            var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/execution/all?page=1&count=10&status=1&adminId=1' + 'startDate=' + startDate + 'endDate=' + endDate + 'key=' + keywords;
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                console.log(response)
            }, function errorCallback(response) {
                console.log(response)
            });
        };


    });
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


//添加工程信息
angular.module('equipmentApp.controller').controller('projectInfoAddCtrl',function ($scope,$uibModalInstance,deviceApi) {
        //调取施工总承包单位


        deviceApi.getPrimaryContractorCompany().then(function (data) {
            $scope.primaryContractorCompanyDetail=data;
            console.log( $scope.primaryContractorCompanyDetail)
        }, function () {
        });
        $scope.primaryContractorCompany={
            selected:''
        }
        //调取建设单位
        deviceApi.getConstructionCompany().then(function (data) {
            $scope.constructionCompanyDetail=data;
            console.log( $scope.constructionCompanyDetail)
        }, function () {
        });
        $scope.constructionCompany={
            selected:''
        }
        //调取监理单位
        deviceApi.getSupervisingCompany().then(function (data) {
            $scope.supervisingCompanyDetail=data;
            console.log( $scope.supervisingCompanyDetail)
        }, function () {
        });
        $scope.supervisingCompany={
            selected:''
        }
        //调取监管单位
        deviceApi.getRegulationCompany().then(function (data) {
            $scope.regulationCompanyDetail=data;
            console.log( $scope.regulationCompanyDetail)
        }, function () {
        });
        $scope.regulationCompany={
            selected:''
        }
        //调取工程申报单位
        deviceApi.getDeclarationCompany().then(function (data) {
            $scope.declarationCompanyDetail=data;
            console.log( $scope.declarationCompanyDetail)
        }, function () {
        });
        $scope.declarationCompany={
            selected:''
        }





        $scope.onConfirmButtonClick = function () {
            // console.log($scope.primaryContractorCompany.selected);
            var addProject={
                name:$scope.name,
                constructionLicenseCode:$scope.constructionLicenseCode,
                projectLeader:$scope.projectLeader,
                projectLeaderPhone:$scope.projectLeaderPhone,
                address:$scope.address,
                floorage:$scope.floorage,
                height:$scope.height,
                declarant:$scope.declarant,
                declarationDate:$scope.declarationDate,
                primaryContractorCompany:$scope.primaryContractorCompany.selected.companyType,
                constructionCompany:$scope.primaryContractorCompany.selected.companyType,
                supervisingCompany:$scope.supervisingCompany.selected.companyType,
                regulationCompany:$scope.regulationCompany.selected.companyType,
                declarationCompany:$scope.declarationCompany.selected.companyType
            }

            deviceApi.postProjectList(addProject).then(function () {
                swal("上传成功！","请确认！","success");
                $uibModalInstance.dismiss('cancel');


            })

        }










        $scope.ok = function () {

            $uibModalInstance.close();
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
)

angular.module('equipmentApp.controller').controller('equipmentAddCtrl',function ($scope,$uibModalInstance) {

        $scope.ok = function () {

            $uibModalInstance.close();
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    })
angular.module('equipmentApp.controller')
    .controller('inspectionAddCtrl',function ($scope,$uibModalInstance) {

    $scope.ok = function () {

        $uibModalInstance.close();
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

})

angular.module('equipmentApp.controller').controller('driverCtrl',function ($scope,$uibModalInstance) {







    $scope.ok = function () {

        $uibModalInstance.close();
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


})


angular.module('equipmentApp.controller').controller('workerCtrl',function ($scope,$uibModalInstance) {

    $scope.ok = function () {

        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


})

angular.module('equipmentApp.controller').controller('safetyAddCtrl',function ($scope,$uibModalInstance) {

        $scope.ok = function () {

            $uibModalInstance.close();
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

angular.module('equipmentApp.controller')
    .controller('certificateDetailModalCtrl', function ($uibModalInstance, items, $scope, deviceApi) {
        deviceApi.getCertificateDetail(items.id).then(function (data) {
            $scope.certificateDetailAll = data;
            console.log($scope.certificateDetailAll)
        }, function () {
        });


        $scope.ok = function () {
            $uibModalInstance.close();
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    });
angular.module('equipmentApp.controller')
    .controller('certificateModalCtrl', function ($uibModalInstance, items, $scope, deviceApi) {
        deviceApi.getRecheckConclusionDetailAll(items.id).then(function (data) {
            $scope.recheckConclusionDetailAll = data.data;
            console.log($scope.recheckConclusionDetailAll)
        }, function () {
        });

        $scope.printpage = function () {
            bdhtml = window.document.body.innerHTML;//获取当前页的html代码
            sprnstr = "<!--startprint-->";//设置打印开始区域
            eprnstr = "<!--endprint-->";
            prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr) + 18);
            prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));
            // prnhtml.onload = function () {
            //     window.print();
            //     window.close();
            // }
            window.document.body.innerHTML = prnhtml;
            window.print();
            window.document.body.innerHTML = bdhtml;
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
angular.module('equipmentApp.controller')
    .controller('acceptDetailAllModalCtrl', function ($uibModalInstance, items, $scope, deviceApi) {
        deviceApi.getAcceptDetailAll(items.id).then(function (data) {
            $scope.acceptDetailAll = data;
            $scope.applicationDetailAll = data.data.application;
            $scope.auditDetail = data.data.accept;
            console.log(data);
        }, function () {
        });
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
angular.module('equipmentApp.controller')
    .controller('assignDetectionModalCtrl', function ($uibModalInstance, items, $scope, deviceApi, $rootScope) {
        deviceApi.getAcceptedDetail(items.id).then(function (data) {
            $scope.acceptedDetail = data.data;
            console.log($scope.acceptedDetail)
        }, function () {
        });
        deviceApi.getInspectorList().then(function (data) {
            $scope.inspectors = data.data;
            $scope.inspectorsData = {}
        }, function () {
        });

        $scope.ok = function () {
            var assignData = {
                acceptId: $scope.acceptedDetail.id,
                inspectorId: $scope.inspectorsData.inspector.id,
                adminId: '1',
            };
            $rootScope.myPromise = deviceApi.postAcceptAssign(assignData).then(function (data) {
                swal("受理成功!", "请确认!", "success")
                $uibModalInstance.close();
            }, function () {
            });
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
angular.module('equipmentApp.controller')
    .controller('executionDetailsAllModalCtrl', function ($uibModalInstance, items, $scope, deviceApi) {


        deviceApi.getReportMaterial(items.id).then(function (data) {
            $scope.reportMaterial = data.data;
            // console.log($scope.reportMaterial)
        }, function () {
        });
        deviceApi.getExecutionDetailAll(items.id).then(function (data) {
            $scope.applicationDetailAll = data.data.application;
            $scope.auditDetail = data.data.accept;
            $scope.executionDetail = data.data.execution;
            // console.log(data.data)
            // console.log($scope.applicationDetailAll.materialFiles)
            console.log($scope.executionDetail)
            for (var j = 0; j < $scope.reportMaterial.length; j++) {
                $scope.reportMaterial[j].fileCon = [];
                for (var i = 0; i < $scope.executionDetail.materialFiles.length; i++) {
                    if ($scope.executionDetail.materialFiles[i].name == $scope.reportMaterial[j].name) {
                        for (var value in $scope.executionDetail.materialFiles[i]) {
                            if (value != "name" && $scope.executionDetail.materialFiles[i][value]) {
                                $scope.reportMaterial[j].fileCon.push({
                                    url: $scope.executionDetail.materialFiles[i][value]
                                })
                            }
                        }
                    }

                }

            }
        }, function () {
        });
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    });
angular.module('equipmentApp.controller')
    .controller('modifyReportModalCtrl', function ($uibModalInstance, items, $scope, Upload, deviceApi) {

        deviceApi.getReportMaterial(items.id).then(function (data) {
            $scope.reportMaterial = data.data;
            console.log($scope.reportMaterial)
        }, function () {
        });


        //现场检测图片展示
        deviceApi.getExecutionDetailAll(items.id).then(function (data) {
            $scope.executionDetail = data.data;
            console.log($scope.executionDetail)
            for (var j = 0; j < $scope.reportMaterial.length; j++) {
                $scope.reportMaterial[j].fileCon = [];
                for (var i = 0; i < $scope.executionDetail.execution.materialFiles.length; i++) {
                    if ($scope.executionDetail.execution.materialFiles[i].name == $scope.reportMaterial[j].name) {
                        for (var value in $scope.executionDetail.execution.materialFiles[i]) {
                            if (value != "name" && $scope.executionDetail.execution.materialFiles[i][value]) {
                                $scope.reportMaterial[j].fileCon.push({
                                    url: $scope.executionDetail.execution.materialFiles[i][value]
                                })
                            }
                        }
                    }

                }

            }
            console.log($scope.reportMaterial)

        }, function () {
        });
        $scope.ok = function () {


            for (var i = 0; i < $scope.reportMaterial.length; i++) {

                for (var j = 0; j < $scope.reportMaterial[i].fileCon.length; j++) {
                    console.log(123)
                    Upload.upload({
                        url: 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/report-material/upload',
                        data: {
                            reportMaterialId: $scope.reportMaterial[i].id,
                            executionId: $scope.executionDetail.execution.id,
                            materialFile: $scope.reportMaterial[i].fileCon[j].url,
                            position: j + 1
                        }
                    })
                        .success(function (data, status, headers, config) {
                            console.log('图片上传成功');
                            swal("上传成功!", "请确认!", "success")
                            $uibModalInstance.close();
                        })
                        .error(function (data, status, headers, config) {
                            console.log('error');
                        })

                }

            }
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    });
angular.module('equipmentApp.controller')
    .controller('writeReportModalCtrl', function ($uibModalInstance, items, $scope, deviceApi, Upload) {
        $scope.reportData = {
            executionId: items.id,
            code: '',
            deviceInstallAddress: '',
            factoryNumber: '',
            installLicenseCode: '',
            factory: '',
            manufacturingLicenseNumber: '',
            factoryDate: '',
            serviceLife: '',
            mountingHeight: '',
            maxSpecifiedWeight: '',
            maxLoadMoment: '',
            liftingSpeed: '',
            maxRadius: '',
            installRadius: '',
            derrickingSpeed: '',
            gantryTravelingSpeed: '',
            attachChannelCount: '',
            inspectionStandard: '',
            mainInspectionInstrument: '',
            inspectionConclusion: '',
            remark: '',
            nextInspectionDate: '',
            auditOfficer: '',
            auditDate: '',
            authorizingOfficer: '',
            authorizingDate: '',
            inspectionUnitCertificate: '',
            issueDate: '',
            inspectionReportConclusionPageFile: '',
            inspectionReportCoverPageFile: ''
        };
        $scope.factoryDate = {
            date: ''
        };
        $scope.nextInspectionDate = {
            date: ''
        };
        $scope.auditDate = {
            date: ''
        };
        $scope.authorizingDate = {
            date: ''
        };
        $scope.issueDate = {
            date: ''
        };
        $scope.ok = function () {
            $scope.reportData.factoryDate = $scope.factoryDate.date.getFullYear() + '-' + ($scope.factoryDate.date.getMonth() + 1) + '-' + $scope.factoryDate.date.getDate();
            $scope.reportData.nextInspectionDate = $scope.nextInspectionDate.date.getFullYear() + '-' + ($scope.nextInspectionDate.date.getMonth() + 1) + '-' + $scope.nextInspectionDate.date.getDate();
            $scope.reportData.auditDate = $scope.auditDate.date.getFullYear() + '-' + ($scope.auditDate.date.getMonth() + 1) + '-' + $scope.auditDate.date.getDate();
            $scope.reportData.authorizingDate = $scope.authorizingDate.date.getFullYear() + '-' + ($scope.authorizingDate.date.getMonth() + 1) + '-' + $scope.authorizingDate.date.getDate();
            $scope.reportData.issueDate = $scope.issueDate.date.getFullYear() + '-' + ($scope.issueDate.date.getMonth() + 1) + '-' + $scope.issueDate.date.getDate();
            // deviceApi.postAonclusionAdd($scope.reportData).then(function (data) {
            //     swal("上传成功!", "请确认!", "success")
            //     $uibModalInstance.close();
            // }, function () {
            // });
            console.log($scope.reportData)
            Upload.upload({
                url: 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/conclusion/add',
                data: $scope.reportData
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
angular.module('equipmentApp.controller')
    .controller('acceptedDetailsModalCtrl', function ($uibModalInstance, items, $scope, deviceApi) {
        deviceApi.getApplicationDetailAll(items.id).then(function (data) {
            $scope.applicationDetailAll = data.application;
            console.log($scope.applicationDetailAll);
        }, function () {
        });
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
angular.module('equipmentApp.controller')
    .controller('modifyApplicationModalCtrl', function ($uibModalInstance, items, $scope, deviceApi, Upload, $http, $rootScope) {
        deviceApi.getApplicationDetail(items.id).then(function (data) {
            $scope.applicationModifyDetail = data.data;
            console.log($scope.applicationModifyDetail)
        }, function () {
        });
        deviceApi.getEngineeringList().then(function (data) {
            $scope.engineeringList = data;
        }, function () {
        });
        deviceApi.getCompanyList().then(function (data) {
            $scope.companyList = data;
        }, function () {
        });
        deviceApi.getDeviceType().then(function (data) {
            $scope.deviceType = data;
            // console.log($scope.deviceType)
        }, function () {
        });

        $scope.files = [];
        //上传图片
        $scope.ok = function (file) {
            var newApplicationData = {
                id: $scope.applicationModifyDetail.id,
                iprCode: $scope.applicationModifyDetail.iprCode,
                deviceCode: $scope.applicationModifyDetail.deviceCode,
                deviceName: $scope.applicationModifyDetail.deviceName,
                specification: $scope.applicationModifyDetail.specification,
                declarant: $scope.applicationModifyDetail.declarant,
                adminId: '1',
                deviceTypeId: $scope.applicationModifyDetail.deviceType.id,
                applicationCompanyId: $scope.applicationModifyDetail.applicationCompany.id,
                projectId: $scope.applicationModifyDetail.project.id
            };
            console.log($scope.files)
            $rootScope.myPromise = deviceApi.postApplicationUpdate(newApplicationData).then(function (data) {
                swal("修改成功!", "请确认!", "success")
                $uibModalInstance.close();
            }, function () {
            });
            if ($scope.files[0]) {
                for (var i = 0; i < $scope.files.length; i++) {
                    Upload.upload({
                        url: 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/application-material/upload',
                        data: {
                            applicationId: $scope.applicationModifyDetail.id,
                            applicationMaterialId: $scope.applicationModifyDetail.deviceType.applicationMaterials[i].id,
                            materialFile: $scope.files[i]
                        }
                    })
                        .success(function (data, status, headers, config) {
                            console.log('图片上传成功');
                        })
                        .error(function (data, status, headers, config) {
                            console.log('error');
                        })
                }
            }
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
angular.module('equipmentApp.controller')
    .controller('waitAcceptedModalCtrl', function ($uibModalInstance, items, $scope, deviceApi, $rootScope) {
        deviceApi.getApplicationDetail(items.id).then(function (data) {
            $scope.applicationDetail = data.data;
            console.log($scope.applicationDetail);
        }, function () {
        });
        $scope.ok = function () {

            var acceptedData = {
                applicationId: $scope.applicationDetail.id,
                result: '1',
                adminId: '1'
            };

            $rootScope.myPromise = deviceApi.postAccepted(acceptedData).then(function (data) {
                // swal("受理成功!", "请确认!", "success")
                $uibModalInstance.close();
            }, function () {
            });
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
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
angular.module('equipmentApp.controller')
    .controller('recheckDetailAllModalCtrl', function ($uibModalInstance, items, $scope, deviceApi) {
        deviceApi.getConclusionDetailAll(items.id).then(function (data) {
            $scope.applicationDetailAll = data.data.application;
            $scope.auditDetail = data.data.accept;
            $scope.executionDetail = data.data.execution;
            $scope.conclusionDetail = data.data.conclusion;
            console.log(data.data)

            $scope.imageArr = [];
            for (var i = 0; i <= $scope.executionDetail.materialFiles.length; i++) {
                $scope.imageArr.push([]);
                for (value in $scope.executionDetail.materialFiles[i]) {
                    if (value != 'name' && $scope.executionDetail.materialFiles[i][value]) {
                        $scope.imageArr[i].push(
                            {url: $scope.executionDetail.materialFiles[i][value]}
                        )

                    }
                }
            }
        }, function () {
        });
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
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
angular.module('equipmentApp.controller')
    .controller('executionDetailAllModalCtrl', function ($uibModalInstance, items, $scope, deviceApi) {
        deviceApi.getExecutionDetailAll(items.id).then(function (data) {
            $scope.applicationDetailAll = data.data.application;
            $scope.auditDetail = data.data.accept;
            $scope.executionDetail = data.data.execution;
            console.log(data.data)
            console.log($scope.applicationDetailAll.materialFiles)
        }, function () {
        });
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
angular.module('equipmentApp.controller')
    .controller('siteModifyModalCtrl', function ($uibModalInstance, Upload, items, $scope, deviceApi, $rootScope) {
        $scope.siteReportId = items.id;
        deviceApi.getReportMaterial($scope.siteReportId).then(function (data) {
            $scope.reportMaterial = data.data;
            console.log($scope.reportMaterial)
            for (var i = 0; i < $scope.reportMaterial.length; i++) {
                $scope.reportMaterial[i].fileCon = [];
            }
        }, function () {
        });


        $scope.ok = function () {


            for (var i = 0; i < $scope.reportMaterial.length; i++) {

                for (var j = 0; j < $scope.reportMaterial[i].fileCon.length; j++) {
                    Upload.upload({
                        url: 'http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/report-material/upload',
                        data: {
                            reportMaterialId: $scope.reportMaterial[i].id,
                            executionId: $scope.siteReportId,
                            materialFile: $scope.reportMaterial[i].fileCon[j].url,
                            position: j + 1
                        }
                    })
                        .success(function (data, status, headers, config) {
                            console.log('图片上传成功');
                            $rootScope.myPromise = deviceApi.postFinish($scope.siteReportId).then(function (data) {
                                // swal("上传成功!", "请确认!", "success")
                                $uibModalInstance.close();
                            }, function () {
                            });
                        })
                        .error(function (data, status, headers, config) {
                            console.log('error');
                        })

                }

            }
        }
        $scope.delThis = function (index) {

        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    });