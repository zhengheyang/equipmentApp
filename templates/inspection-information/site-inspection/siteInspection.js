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