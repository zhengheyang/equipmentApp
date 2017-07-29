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