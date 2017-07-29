var server='http://bigbug.tech:8080/device-api-dev/';
var address={
    //申报
    application:{
        add:'api/device-inspection/application/add',
        waitAccept:'api/device-inspection/application/wait-accept', //?page=1&count=20
        detail:'api/device-inspection/application/detail', //?id=227'
        detailAll:'api/device-inspection/application/detail-all', //?id=2'
        accepted:'api/device-inspection/application/accepted',   //?page=1&count=20&adminId=1'
        update:'api/device-inspection/application/update'
    },
    //申请材料
    applicationMaterial:{
        upload:'api/device-inspection/application-material/upload',
        byDeviceType:'api/device-inspection/application-material/by-device-type'   //?deviceTypeId=1'
    },
    // 受理
    accept:{
        process:'api/device-inspection/accept/process',
        assign:'api/device-inspection/accept/assign',
        waitAssign:'api/device-inspection/accept/wait-assign',    //?page=1&count=2',
        detail:'api/device-inspection/accept/detail',        //?id=1',
        detailAll:'api/device-inspection/accept/detail-all',        //?id=2',
        assigned:'api/device-inspection/accept/assigned',        //??page=1&count=2&adminId=5',
    },
    // 现场检验&执行
    execution:{
        all:'api/device-inspection/execution/all',   //?page=1&count=10&status=1&adminId=1'
        finish:'api/device-inspection/execution/finish',
        byUser:'api/device-inspection/execution/by-user',     //?status=3&userId=2',
        detail:'api/device-inspection/execution/detail',       //?id=10',
        waitConclude:'api/device-inspection/execution/wait-conclude',    //?page=1&count=20',
        signIn:'api/device-inspection/execution/sign-in',
        signOut:'api/device-inspection/execution/sign-out',
        detailAll:'api/device-inspection/execution/detail-all',        //?id=1',
    },
    //报检结论
    conclusion:{
        add:'api/device-inspection/conclusion/add',
        waitRecheck:'api/device-inspection/conclusion/wait-recheck',
        detail:'api/device-inspection/conclusion/detail',       //?id=2'
        detailAll:'api/device-inspection/conclusion/detail-all',      //?id=1',
    },
    //报告材料
    reportMaterial:{
        detail:'api/device-inspection/report-material/detail',       //?executionId=53'
        upload:'api/device-inspection/report-material/upload',
        add:'api/device-inspection/report-material/add',
        update:'api/device-inspection/report-material/update',
        byDeviceType:'api/device-inspection/report-material/by-device-type',    //?deviceTypeId=1',
        remove:'api/device-inspection/report-material/remove',
    },
    // 复检
    recheckConclusion:{
        add:'api/device-inspection/recheck-conclusion/add',
        show:'api/device-inspection/recheck-conclusion/show',
        detail:'api/device-inspection/recheck-conclusion/detail', //?id=2',
        detailAll:'api/device-inspection/recheck-conclusion/detail-all',     //?id=1',


    }
};
