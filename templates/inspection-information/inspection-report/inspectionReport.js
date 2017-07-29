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