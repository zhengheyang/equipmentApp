//添加公司信息模态框
angular.module('equipmentApp.controller').controller("modalInstallCtrl",function ($scope,items,deviceApi) {

    $scope.items = items;
    $scope.adminManagementObj = {
        management:[
            {
                id:1,
                name:'安装单位'
            },
            {
                id:2,
                name:'产权单位'
            },
            {
                id:3,
                name:'施工总承包单位'
            },
            {
                id:4,
                name:'检验单位'
            },
            {
                id:5,
                name:'其他单位'
            }
        ]
    };
    $scope.unitNature = [
        {
            id:1,
            name:'安装单位'
        },
        {
            id:2,
            name:'产权单位'
        },
        {
            id:3,
            name:'施工总承包单位'
        },
        {
            id:4,
            name:'检验单位'
        },
        {
            id:5,
            name:'其他单位'
        }
    ]

})
