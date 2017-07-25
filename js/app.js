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
    'equipmentApp.controllerGC',
    'equipmentApp.controllerLJ',
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
                controller:'singCtrl'
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
                        templateUrl: 'templates/engineering-service.html',
                        controller:'engineeringServiceCtrl'
                    }
                }
            })
            .state('main.equipment-service', {
                url: '/equipment-service',
                views: {
                    'main-page': {
                        templateUrl: 'templates/equipment-service.html',
                        controller:'equipmentCtrl'

                    }
                }
            })
            .state('main.epc-unit', {
                url: '/epc-unit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/epc-unit.html',
                        controller:'epcUnitCtrl'
                    }
                }
            })
            .state('main.inspection-person', {
                url: '/inspection-person',
                views: {
                    'main-page': {
                        templateUrl: 'templates/inspection-person.html',
                        controller:'inspectionPersonCtrl'
                    }
                }
            })
            .state('main.inspection-unit', {
                url: '/inspection-unit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/inspection-unit.html',
                        controller:'inspectionUnitCtrl'
                    }
                }
            })
            .state('main.install-unit', {
                url: '/install-unit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/install-unit.html',
                        controller:'installUnitCtrl'
                    }
                }
            })
            .state('main.other-unit', {
                url: '/other-unit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/other-unit.html',
                        controller:'otherUnitCtrl'
                    }
                }
            })
            .state('main.property-unit', {
                url: '/property-unit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/property-unit.html',
                        controller:'propertyUnitCtrl'
                    }
                }
            })
            .state('main.inspection-application', {
                url: '/inspection-application',
                views: {
                    'main-page': {
                        templateUrl: 'templates/inspection-application.html',
                        controller: 'inspectionApplicationCtrl',
                    }
                }
            })
            .state('main.inspection-unit-audit', {
                url: '/inspection-unit-audit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/inspection-unit-audit.html',
                        controller: 'inspectionUnitAuditCtrl'
                    }
                }
            })
            .state('main.qtz-driver', {
                url: '/qtz-driver',
                views: {
                    'main-page': {
                        templateUrl: 'templates/qtz-driver.html',
                        controller:'qtzDriverCtrl'
                    }
                }
            })
            .state('main.qtz-worker', {
                url: '/qtz-worker',
                views: {
                    'main-page': {
                        templateUrl: 'templates/qtz-worker.html',
                        controller:'qtzWorkerCtrl'
                    }
                }
            })
            .state('main.safety-officer', {
                url: '/safety-officer',
                views: {
                    'main-page': {
                        templateUrl: 'templates/safety-officer.html',
                        controller:'safetyCtrl'
                    }
                }
            })
            .state('main.role-management', {
                url: '/role-management',
                views: {
                    'main-page': {
                        templateUrl: 'templates/role-management.html',
                        controller: 'roleManagementCtrl'
                    }
                }
            })
            .state('main.admin-management', {
                url: '/admin-management',
                views: {
                    'main-page': {
                        templateUrl: 'templates/admin-management.html',
                        controller:'adminManagementCtrl'
                    }
                }
            })
            .state('main.detection-prepare', {
                url: '/detection-prepare',
                views: {
                    'main-page': {
                        templateUrl: 'templates/detection-prepare.html',
                        controller:'detectionPrepareCtrl'
                    }
                }
            })
            .state('main.certificate', {
                url: '/certificate',
                views: {
                    'main-page': {
                        templateUrl: 'templates/certificate.html',
                        controller:'certificateCtrl'
                    }
                }
            })
            .state('main.inspection-report', {
                url: '/inspection-report',
                views: {
                    'main-page': {
                        templateUrl: 'templates/inspection-report.html',
                        controller:'inspectionReportCtrl'
                    }
                }
            })
            .state('main.report-recheck', {
                url: '/report-recheck',
                views: {
                    'main-page': {
                        templateUrl: 'templates/report-recheck.html',
                        controller:'reportRecheckCtrl'
                    }
                }
            })
            .state('main.site-inspection', {
                url: '/site-inspection',
                views: {
                    'main-page': {
                        templateUrl: 'templates/site-inspection.html',
                        controller:'siteInspectionCtrl'
                    }
                }
            })
           $urlRouterProvider.otherwise('/singnin');
        // if none of the above states are matched, use this as the fallback
    })
