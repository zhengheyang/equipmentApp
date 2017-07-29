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