/**
 * Created by zhyang on 17-6-30.
 */
angular.module('equipmentApp.filters',[])
.filter('sex',function () {
return function (data) {
    if(data==0){
        return ''
    }
    else if(data==1){
        return '男'
    }
    else if(data==2){
        return '女'
    }
    else return data
}
})
.filter('jopTypeSelect',function () {
    return function (data) {
        if (data == 1) {
            return '检验人员'
        }
        else if(data==2){
            return '塔机司机'
        }
        else if(data==3){
            return '塔机索工'
        }
        else if(data==4){
            return '安全员'
        }
        else return data

    }

})

    //公司类别过滤器

        .filter('companyType', function () {
            return function (data) {
                if (data == 1) {
                    return '安装单位'
                } else if (data == 2) {
                    return '产权单位'
                } else if (data == 3) {
                    return '施工总承包单位'
                } else if (data == 4) {
                    return '检验单位'
                } else if (data == 5) {
                    return '其他单位'
                }
                else return data
            }
        })


