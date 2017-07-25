/**
 * Created by zhyang on 17-6-30.
 */
angular.module('equipmentApp.controller', [])
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
    })
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
    })
    //检验单位审核
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
                templateUrl: 'templates/modal/modifyApplication.html',
                controller: 'modifyModalCtrl',
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
                templateUrl: 'templates/modal/waitAccepted.html',
                controller: 'acceptedModalCtrl',
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
                templateUrl: 'templates/modal/acceptedDetails.html',
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

    })
    //inspectionUnitAuditCtrl模态框controller.start
    .controller('modifyModalCtrl', function ($uibModalInstance, items, $scope, deviceApi, Upload, $http, $rootScope) {
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
    .controller('acceptedModalCtrl', function ($uibModalInstance, items, $scope, deviceApi, $rootScope) {
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
    })
    .controller('acceptedDetailsModalCtrl', function ($uibModalInstance, items, $scope, deviceApi) {
        deviceApi.getApplicationDetailAll(items.id).then(function (data) {
            $scope.applicationDetailAll = data.application;
            console.log($scope.applicationDetailAll);
        }, function () {
        });
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    //inspectionUnitAuditCtrl模态框controller.end
    //检验单位检验准备
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
                templateUrl: 'templates/modal/assignDetection.html',
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
                templateUrl: 'templates/modal/acceptDetailAll.html',
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
    })
    //detectionPrepareCtrl模态框controller.start
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
    })
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
    })
    //detectionPrepareCtrl模态框controller.end
    //现场检验
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
                templateUrl: 'templates/modal/siteModify.html',
                controller: 'siteModifyCtrl',
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
                templateUrl: 'templates/modal/executionDetailAll.html',
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


    })
    //siteInspectionCtrl模态框controller.start
    .controller('siteModifyCtrl', function ($uibModalInstance, Upload, items, $scope, deviceApi, $rootScope) {
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

    })
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
    })
    //siteInspectionCtrl模态框controller.end
    //检验报告
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
                templateUrl: 'templates/modal/modifyReport.html',
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
                templateUrl: 'templates/modal/writeReport.html',
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
                templateUrl: 'templates/modal/executionDetailAll.html',
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
    })
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

    })
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

    })
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
    })




    //检验报告复检
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
                templateUrl: 'templates/modal/recheckModify.html',
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
                templateUrl: 'templates/modal/addRecheckReport.html',
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
                templateUrl: 'templates/modal/recheckDetailAll.html',
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
    })

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
    })
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
    })
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
    })
    //安全检验合格证
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
                templateUrl: 'templates/modal/certificate.html',
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
                templateUrl: 'templates/modal/certificateDetail.html',
                controller: 'certificateDetailCtrl',
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

    })
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
    })
    .controller('certificateDetailCtrl', function ($uibModalInstance, items, $scope, deviceApi) {
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

    })



































    // 高琛  上传  角色管理界面 控制器

    .controller('roleManagementCtrl', function ($scope, $log, deviceApi, $uibModal) {

        var getRoleManagement = function () {
            deviceApi.getRoleManagement().then(function (data) {
                $scope.roleManagementArray = data.data.result.data;
                // console.log($scope.roleManagementArray )
                $scope.newRoleManagementArray = $scope.roleManagementArray.slice(0, 3)
                // console.log($scope.newRoleManagementArray)
            }, function (error) {
            });
        };
        getRoleManagement();
        $scope.items = [
            {
                id: 1,
                name: '设备检验申请',
                ischecked: false
            },
            {
                id: 2,
                name: '检验单位审核',
                ischecked: false
            },
            {
                id: 3,
                name: '检验单位检验准备',
                ischecked: false
            },
            {
                id: 4,
                name: '现场检验',
                ischecked: false
            },
            {
                id: 5,
                name: '检验报告',
                ischecked: false
            },
            {
                id: 6,
                name: '单位管理',
                ischecked: false
            },
            {
                id: 7,
                name: '人员管理',
                ischecked: false
            },
            {
                id: 8,
                name: '工程管理',
                ischecked: false
            },
            {
                id: 9,
                name: '管理员管理',
                ischecked: false
            },
            {
                id: 10,
                name: '设备类型管理',
                ischecked: false
            },
            {
                id: 11,
                name: '角色管理',
                ischecked: false
            },
            {
                id: 12,
                name: '安全检验合格证',
                ischecked: false
            },
            {
                id: 13,
                name: '检验报告复检',
                ischecked: false
            },

        ];
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

            });

        };

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
    })


    .controller('ModalInstanceCtrl1', function ($scope, $uibModalInstance, items, deviceApi) {

        $scope.newRoleManagementArray = items;

        $scope.items = [
            {
                id: 1,
                name: '设备检验申请',
                ischecked: false
            },
            {
                id: 2,
                name: '检验单位审核',
                ischecked: false
            },
            {
                id: 3,
                name: '检验单位检验准备',
                ischecked: false
            },
            {
                id: 4,
                name: '现场检验',
                ischecked: false
            },
            {
                id: 5,
                name: '检验报告',
                ischecked: false
            },
            {
                id: 6,
                name: '单位管理',
                ischecked: false
            },
            {
                id: 7,
                name: '人员管理',
                ischecked: false
            },
            {
                id: 8,
                name: '工程管理',
                ischecked: false
            },
            {
                id: 9,
                name: '管理员管理',
                ischecked: false
            },
            {
                id: 10,
                name: '设备类型管理',
                ischecked: false
            },
            {
                id: 11,
                name: '角色管理',
                ischecked: false
            },
            {
                id: 12,
                name: '安全检验合格证',
                ischecked: false
            },
            {
                id: 13,
                name: '检验报告复检',
                ischecked: false
            },

        ];
        for (var i = 0; i < $scope.items.length; i++) {
            for (var j = 0; j < $scope.newRoleManagementArray.permissions.length; j++) {
                if ($scope.newRoleManagementArray.permissions[j].id == $scope.items[i].id) {
                    $scope.items[i].ischecked = true;
                }
            }
        }
        $scope.rolename = $scope.newRoleManagementArray.name;

        var newPermissions = [];
        $scope.items.map(function (index) {
            if (index.ischecked == true) {
                newPermissions.push(index.id)
            }
        })


        $scope.addRole = function () {
            $uibModalInstance.close('cancel');
            var editArray = {
                name: $scope.rolename,
                permissionsId: newPermissions,
                id: $scope.newRoleManagementArray.id,
                adminId: 1
            }
            deviceApi.editRoleManagement(editArray);
        }

    })

    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, deviceApi) {
        $scope.items = items;
        $scope.addRole = function () {
            $uibModalInstance.close('cancel');
            console.log($scope.items)
            var newPermissions = [];
            items.map(function (index) {
                if (index.ischecked == true) {
                    newPermissions.push(index.id)
                }
            })

            var postArray = {
                name: $scope.roleName,
                permissionsId: newPermissions,
                adminId: 1
            }

            console.log(postArray)

            deviceApi.postRoleManagement(postArray);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
            items.map(function (index) {
                index.ischecked = false;
            })
        };
    })


// 角色管理界面  结束标志

