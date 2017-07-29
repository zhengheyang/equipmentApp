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