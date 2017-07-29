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
