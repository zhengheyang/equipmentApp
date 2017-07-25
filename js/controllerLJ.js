/**
 * Created by zhyang on 17-7-8.
 */
//工程管理
angular.module('equipmentApp.controllerLJ', [])
    .controller('engineeringServiceCtrl',function ($scope,$uibModal,deviceApi) {

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
                templateUrl: 'templates/modal/projectInfoAdd.html',
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
                templateUrl: 'templates/modal/enginnering-service-modify.html',
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
    //添加工程信息
    .controller('projectInfoAddCtrl',function ($scope,$uibModalInstance,deviceApi) {
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



    //编辑工程信息
    .controller('enginneringServiceModifyModalCtrl',function ($scope,$uibModalInstance, items,deviceApi) {

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



    //检验人员
    .controller('inspectionPersonCtrl',function ($scope,$uibModal,deviceApi) {
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
                templateUrl: 'templates/modal/inspection-person-add.html',
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

    .controller('inspectionAddCtrl',function ($scope,$uibModalInstance) {
















        $scope.ok = function () {

            $uibModalInstance.close();
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    })





















    //塔机司机
    .controller('qtzDriverCtrl',function ($scope,$uibModal,deviceApi) {
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
                templateUrl: 'templates/modal/qtzDriverAdd.html',
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
    .controller('driverCtrl',function ($scope,$uibModalInstance) {







        $scope.ok = function () {

            $uibModalInstance.close();
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    })


    //塔机索工
    .controller('qtzWorkerCtrl',function ($scope,$uibModal,deviceApi) {
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
                templateUrl: 'templates/modal/qtzWorkerAdd.html',
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
    .controller('workerCtrl',function ($scope,$uibModalInstance) {









        $scope.ok = function () {

            $uibModalInstance.close();
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    })




    //安全员
    .controller('safetyCtrl',function ($scope,$uibModal,deviceApi) {
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
                templateUrl: 'templates/modal/safetyAdd.html',
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
    .controller('safetyAddCtrl',function ($scope,$uibModalInstance) {







        $scope.ok = function () {

            $uibModalInstance.close();
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })






//设备类型管理
    .controller('equipmentCtrl',function ($scope,$uibModal,deviceApi) {
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
                templateUrl: 'templates/modal/equipmentAdd.html',
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
    .controller('equipmentAddCtrl',function ($scope,$uibModalInstance) {










        $scope.ok = function () {

            $uibModalInstance.close();
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    })



