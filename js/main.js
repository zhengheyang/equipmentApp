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