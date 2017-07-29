//添加工程信息
angular.module('equipmentApp.controller').controller('projectInfoAddCtrl',function ($scope,$uibModalInstance,deviceApi) {
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