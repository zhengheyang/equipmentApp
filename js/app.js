/**
 * Created by zhyang on 17-6-30.
 */
angular.module('equimentApp',['ui.bootstrap','ui.router','ui.select','ngSanitize','equimentApp.controller','equimentApp.services'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('signin',{
                url:'/singnin',
                templateUrl:'templates/signin.html'
            })
            .state('main',{
                url: '/main',
                // abstract: true,
                templateUrl: 'templates/main.html',
                controller:'mainCtrl'
            })
            .state('main.page1', {
                url: '/page1',
                views: {
                    'main-page': {
                        templateUrl: 'templates/main-page1.html',
                        // controller: 'page1Ctrl'
                    }
                }
            })
            .state('main.page2', {
                url: '/page2',
                views: {
                    'main-page': {
                        templateUrl: 'templates/main-page2.html',
                        // controller: 'page2Ctrl'
                    }
                }
            })
            .state('main.page3', {
                url: '/page3',
                views: {
                    'main-page': {
                        templateUrl: 'templates/main-page3.html',
                        // controller: 'page2Ctrl'
                    }
                }
            })
            .state('main.page4', {
                url: '/page4',
                views: {
                    'main-page': {
                        templateUrl: 'templates/main-page4.html',
                    }
                }
            })
            .state('main.engineering-service', {
                url: '/engineering-service',
                views: {
                    'main-page': {
                        templateUrl: 'templates/engineering-service.html',
                    }
                }
            })
            .state('main.equitment-service', {
                url: '/equitment-service',
                views: {
                    'main-page': {
                        templateUrl: 'templates/equitment-service.html',
                    }
                }
            })
            .state('main.epc-unit', {
                url: '/epc-unit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/epc-unit.html',
                    }
                }
            })
            .state('main.inspection-person', {
                url: '/inspection-person',
                views: {
                    'main-page': {
                        templateUrl: 'templates/inspection-person.html',
                    }
                }
            })
            .state('main.inspection-unit', {
                url: '/inspection-unit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/inspection-unit.html',
                    }
                }
            })
            .state('main.install-unit', {
                url: '/install-unit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/install-unit.html',
                    }
                }
            })
            .state('main.other-unit', {
                url: '/other-unit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/other-unit.html',
                    }
                }
            })
            .state('main.property-unit', {
                url: '/property-unit',
                views: {
                    'main-page': {
                        templateUrl: 'templates/property-unit.html',
                    }
                }
            })
            .state('main.inspection-application', {
                url: '/inspection-application',
                views: {
                    'main-page': {
                        templateUrl: 'templates/inspection-application.html',
                        controller: 'inspectionApplicationCtrl'
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
                    }
                }
            })
            .state('main.qtz-worker', {
                url: '/qtz-worker',
                views: {
                    'main-page': {
                        templateUrl: 'templates/qtz-worker.html',
                    }
                }
            })
            .state('main.safety-officer', {
                url: '/safety-officer',
                views: {
                    'main-page': {
                        templateUrl: 'templates/safety-officer.html',
                    }
                }
            })
            .state('main.role-management', {
                url: '/role-management',
                views: {
                    'main-page': {
                        templateUrl: 'templates/role-management.html',
                    }
                }
            })
            .state('main.admin-management', {
                url: '/admin-management',
                views: {
                    'main-page': {
                        templateUrl: 'templates/admin-management.html',
                    }
                }
            })
           $urlRouterProvider.otherwise('/singnin');
        // if none of the above states are matched, use this as the fallback
    })