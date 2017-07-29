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