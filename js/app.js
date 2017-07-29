/**
 * Created by zhyang on 17-6-30.
 */
angular.module('equipmentApp',[
    'ui.bootstrap',
    'ui.router',
    'ui.select',
    'ngSanitize',
    'cgBusy',
    'equipmentApp.controller',
    'equipmentApp.services',
    'equipmentApp.component',
    'equipmentApp.filters',
    'ngFileUpload',
    'angularValidator'
]).config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('signin',{
                url:'/singnin',
                templateUrl:'templates/signin.html',
                controller:'signInCtrl'
            })
            .state('main',{
                url: '/main',
                templateUrl: 'templates/main.html',
                controller:'mainCtrl'
            })
            .state('main.engineering-service', {
                url: '/engineering-service',
                views: {
                    'main-page': {
                        templateUrl: 'templates/information-show/engineering-service/engineering-service.html',
                        controller:'engineeringServiceCtrl'
                    }
                }
            })
            .state('main.equipment-service', {
                url: '/equipment-service',
                views: {
                    'main-page': {
                        templateUrl: 'templates/information-show/equipment-service/equipment-service.html',
                        controller:'equipmentCtrl'

                    }
                }
            })
            .state('main.epc-unit', {
                url: '/epc-unit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/information-show/epc-unit/epc-unit.html',
                        controller:'epcUnitCtrl'
                    }
                }
            })
            .state('main.inspection-person', {
                url: '/inspection-person',
                views: {
                    'main-page': {
                        templateUrl: 'templates/information-show/inspection-person/inspection-person.html',
                        controller:'inspectionPersonCtrl'
                    }
                }
            })
            .state('main.inspection-unit', {
                url: '/inspection-unit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/information-show/inspection-unit/inspection-unit.html',
                        controller:'inspectionUnitCtrl'
                    }
                }
            })
            .state('main.install-unit', {
                url: '/install-unit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/information-show/install-unit/install-unit.html',
                        controller:'installUnitCtrl'
                    }
                }
            })
            .state('main.other-unit', {
                url: '/other-unit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/information-show/other-unit/other-unit.html',
                        controller:'otherUnitCtrl'
                    }
                }
            })
            .state('main.property-unit', {
                url: '/property-unit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/information-show/property-unit/property-unit.html',
                        controller:'propertyUnitCtrl'
                    }
                }
            })
            .state('main.inspection-application', {
                url: '/inspection-application',
                views: {
                    'main-page': {
                        templateUrl: 'templates/inspection-information/inspection-application/inspection-application.html',
                        controller: 'inspectionApplicationCtrl',
                    }
                }
            })
            .state('main.inspection-unit-audit', {
                url: '/inspection-unit-audit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/inspection-information/inspection-unit-audit/inspection-unit-audit.html',
                        controller: 'inspectionUnitAuditCtrl'
                    }
                }
            })
            .state('main.qtz-driver', {
                url: '/qtz-driver',
                views: {
                    'main-page': {
                        templateUrl: 'templates/information-show/qtz-driver/qtz-driver.html',
                        controller:'qtzDriverCtrl'
                    }
                }
            })
            .state('main.qtz-worker', {
                url: '/qtz-worker',
                views: {
                    'main-page': {
                        templateUrl: 'templates/information-show/qtz-worker/qtz-worker.html',
                        controller:'qtzWorkerCtrl'
                    }
                }
            })
            .state('main.safety-officer', {
                url: '/safety-officer',
                views: {
                    'main-page': {
                        templateUrl: 'templates/information-show/safety-officer/safety-officer.html',
                        controller:'safetyCtrl'
                    }
                }
            })
            .state('main.role-management', {
                url: '/role-management',
                views: {
                    'main-page': {
                        templateUrl: 'templates/management/role-management/role-management.html',
                        controller: 'roleManagementCtrl'
                    }
                }
            })
            .state('main.admin-management', {
                url: '/admin-management',
                views: {
                    'main-page': {
                        templateUrl: 'templates/management/admin-management/admin-management.html',
                        controller:'adminManagementCtrl'
                    }
                }
            })
            .state('main.detection-prepare', {
                url: '/detection-prepare',
                views: {
                    'main-page': {
                        templateUrl: 'templates/inspection-information/detection-prepare/detection-prepare.html',
                        controller:'detectionPrepareCtrl'
                    }
                }
            })
            .state('main.certificate', {
                url: '/certificate',
                views: {
                    'main-page': {
                        templateUrl: 'templates/inspection-information/certificate/certificate.html',
                        controller:'certificateCtrl'
                    }
                }
            })
            .state('main.inspection-report', {
                url: '/inspection-report',
                views: {
                    'main-page': {
                        templateUrl: 'templates/inspection-information/inspection-report/inspection-report.html',
                        controller:'inspectionReportCtrl'
                    }
                }
            })
            .state('main.report-recheck', {
                url: '/report-recheck',
                views: {
                    'main-page': {
                        templateUrl: 'templates/inspection-information/report-recheck/report-recheck.html',
                        controller:'reportRecheckCtrl'
                    }
                }
            })
            .state('main.site-inspection', {
                url: '/site-inspection',
                views: {
                    'main-page': {
                        templateUrl: 'templates/inspection-information/site-inspection/site-inspection.html',
                        controller:'siteInspectionCtrl'
                    }
                }
            })
           $urlRouterProvider.otherwise('/singnin');
        // if none of the above states are matched, use this as the fallback
    })
