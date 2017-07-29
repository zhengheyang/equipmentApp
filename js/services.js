/**
 * Created by zhyang on 17-6-30.
 */
angular.module('equipmentApp.services', [])
    .factory('deviceApi', function ($http, $q, $rootScope) {
        return {
            getEngineeringList: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/project/show?page=1&count=10&adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getCompanyList: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/company/show?page=1&count=20&companyType=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getDeviceType: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/device-type/show';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getApplication: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/application/wait-accept?page=1&count=20';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            postApplication: function (data) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/application/add';

                function aa(res) {
                    deferred.resolve(res);
                }

                function bb(error) {
                    deferred.reject(error);
                }

                $http({
                    method: "POST",
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (res) {
                    setTimeout(function () {
                        return aa(res)
                    }, 1000);
                }, function (error) {
                    setTimeout(function () {
                        return bb(error)
                    }, 1000);
                });
                return deferred.promise;
            },
            getApplicationDetail: function (id) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/application/detail?id=' + id + '&adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            postApplicationUpdate: function (data) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/application/update';

                function aa(res) {
                    deferred.resolve(res);
                }

                function bb(error) {
                    deferred.reject(error);
                }

                $http({
                    method: "POST",
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (res) {
                    setTimeout(function () {
                        return aa(res)
                    }, 1000);
                }, function (error) {
                    setTimeout(function () {
                        return bb(error)
                    }, 1000);
                });
                return deferred.promise;
            },
            postAccepted: function (data) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/accept/process';

                function aa(res) {
                    deferred.resolve(res);
                }

                function bb(error) {
                    deferred.resolve(error);
                }

                $http({
                    method: "POST",
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (res) {
                    setTimeout(function () {
                        return aa(res)
                    }, 1000);
                }, function (error) {
                    setTimeout(function () {
                        return bb(error)
                    }, 1000);
                });
                return deferred.promise;
            },

            getApplicationDetailAll: function (id) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/application/detail-all?id=' + id + '&adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },

            getWaitAssign: function (page) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/accept/wait-assign?page=' + page + '&count=10';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },

            getAcceptedDetail: function (id) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/accept/detail?id=' + id;
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getAcceptDetailAll: function (id) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/accept/detail-all?id=' + id;
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },

            getExecution: function (page) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/execution/all?page=' + page + '&count=10&status=1&adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getReportMaterial: function (id) {
                var deferred = $q.defer();
                var url = 'http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/report-material/detail?executionId=' + id + '&adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getExecutionDetailAll: function (id) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/execution/detail-all?id=' + id + '&adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getWaitConclude: function (id) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/execution/wait-conclude?page=1&count=10&adminId=' + id;
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getInspectorList: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/user/show?page=1&count=20&jobType=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            postAcceptAssign: function (data) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/accept/assign';

                function aa(res) {
                    deferred.resolve(res);
                }

                function bb(error) {
                    deferred.reject(error);
                }

                $http({
                    method: "POST",
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (res) {
                    setTimeout(function () {
                        return aa(res)
                    }, 1000);
                }, function (error) {
                    setTimeout(function () {
                        return bb(error)
                    }, 1000);
                });
                return deferred.promise;
            },
            postAonclusionAdd: function (data) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/conclusion/add';
                $http({
                    method: "POST",
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function successCallback() {
                    deferred.resolve();
                }, function errorCallback() {
                    deferred.reject
                });
                return deferred.promise;
            },
            getWaitRecheck: function (page) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/conclusion/wait-recheck?page=' + page + '&count=10&adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getRecheckConclusion: function (page) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/show?page=' + page + '&count=10&adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getRecheckConclusionDetailAll: function (id) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/detail-all?id=' + id + '&adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getConclusionDetailAll: function (id) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/conclusion/detail-all?id=' + id;
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },


            get111: function (id) {
                var deferred = $q.defer();
                var url = 'http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/detail-all?id=6&adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },


            //高琛  角色管理  接口


//获取所有角色接口请求
            getRoleManagement: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/role/all?adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },

//添加角色接口请求
            postRoleManagement: function (data) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/role/add';
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;

            },

//更新角色接口请求
            editRoleManagement: function (data) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/role/update';
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },

//删除角色接口请求
            deleteRoleManagement: function (data) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/role/remove';
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },

//管理员登录接口请求

            adminLanding: function (username, password) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/admin/auth?username=' + username + '&password=' + password;

                function aa(res) {
                    deferred.resolve(res);
                }

                function bb(error) {
                    deferred.reject(error);
                }

                $http({
                    method: 'POST',
                    url: url,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (res) {
                    setTimeout(function () {
                        return aa(res)
                    }, 1000);
                }, function (error) {
                    setTimeout(function () {
                        return bb(error)
                    }, 1000);
                });
                return deferred.promise;
            },
//获取管理员信息接口请求
            getAdminManagement: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/admin/show?page=1&count=10&adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
//添加管理员信息接口请求
            addAdminManagement: function (data) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/admin/add';
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
//更新管理员信息接口请求
            updateAdminManagement: function (data) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/admin/update';
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
//删除管理员信息接口请求
            deleteAdminManagement: function (data) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/admin/remove';
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },

//获取安装单位公司信息接口请求
            getInstallUnit: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/company/show?page=1&count=20&companyType=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
//获取产权单位公司信息接口请求
            getPropertyUnit: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/company/show?page=1&count=20&companyType=2';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
//获取施工总承包单位公司信息接口请求
            getEpcUnit: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/company/show?page=1&count=20&companyType=3';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
//获取检验单位公司信息接口请求
            getInspectionUnit: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/company/show?page=1&count=20&companyType=4';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
//获取其他单位公司信息接口请求
            getOtherUnit: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/company/show?page=1&count=20&companyType=5';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },

//删除公司信息接口请求
            deleteInstallUnit: function (data) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/company/remove';
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },

            postFinish: function (id) {
                var deferred = $q.defer();
                var url = 'http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/execution/finish?id=' + id;

                function aa(res) {
                    deferred.resolve(res);
                }

                function bb(error) {
                    deferred.resolve(error);
                }

                $http({
                    method: "POST",
                    url: url,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (res) {
                    setTimeout(function () {
                        return aa(res)
                    }, 1000);
                }, function (error) {
                    setTimeout(function () {
                        return bb(error)
                    }, 1000);
                });
                return deferred.promise;
            },


            //高琛  角色管理  结束标志


            //   lj
            getProjectList: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/project/show?page=1&count=10&adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            postProjectList: function (data) {
                var url = 'http://bigbug.tech:8080/device-api-dev/api/project/add';
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                })
            },
            deleteProjectList: function (data) {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/project/remove';
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },

            //get施工总承包单位
            getPrimaryContractorCompany: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/company/show?page=1&count=20&companyType=3';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;

            },
            //get工程申报单位
            getDeclarationCompany: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/company/show?page=1&count=20&companyType=3';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;

            },

            //get监管机构
            getRegulationCompany: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/company/show?page=1&count=20&companyType=4';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;

            },
            //get监理单位
            getSupervisingCompany: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/company/show?page=1&count=20&companyType=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;

            },
            //get建设单位
            getConstructionCompany: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/company/show?page=1&count=20&companyType=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getPersonList: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/user/show?page=1&count=20&jobType=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;

            },
            //get塔机司机数据
            getDriverMessage: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/user/show?page=1&count=20&jobType=2';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            //get塔机索工
            getWorkerMessage: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/user/show?page=1&count=20&jobType=3';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'))

                });
                return deferred.promise;

            },
            //get安全员
            getSaferMessage: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/user/show?page=1&count=20&jobType=4';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);


                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'))

                })
                return deferred.promise;

            },
            //get设备类型管理
            getEquipmentMessage: function () {
                var deferred = $q.defer();
                var url = 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/device-type/show';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'))
                })
                return deferred.promise;

            },
            //get安全合格证详情
            getCertificateDetail: function (id) {
                var deferred = $q.defer();
                var url = 'http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/detail-all?id=' + id + '&adminId=1';
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'))
                })
                return deferred.promise;
            }
            //    lj
        }
    })


    .factory('httpData', function ($http, $q, $rootScope, Upload) {
        return {
            httpPost: function (url, data) {
                var deferred = $q.defer();
                var url = url;

                function success(res) {
                    deferred.resolve(res);
                }

                function error(error) {
                    deferred.resolve(error);
                }

                $http({
                    method: "POST",
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (res) {
                    setTimeout(function () {
                        return success(res)
                    }, 2000);
                }, function (error) {
                    setTimeout(function () {
                        return error(error)
                    }, 2000);
                });
                return deferred.promise;
            },

            httpGet: function (url, data) {
                var deferred = $q.defer();
                var url = url;
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(alert('请求失败！请重试！'));
                });
                return deferred.promise;
            },

            upLoadFile: function (url, data) {
                var deferred = $q.defer();
                Upload.upload({
                    url: url,
                    data: data
                })
                    .success(function (data, status, headers, config) {
                        deferred.resolve(response);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject(alert('上传失败！请重试！'));
                    });
                return deferred.promise;
            }
        }
    })


