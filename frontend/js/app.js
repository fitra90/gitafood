// AngularJS App Module
var gitafoodApp = angular.module('gitafoodApp', ['ngRoute']);

// Route Configuration
gitafoodApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'MainController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

// HTTP Interceptor for API Token
gitafoodApp.factory('AuthInterceptor', ['$q', '$window', function ($q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            var token = $window.localStorage.getItem('api_token');
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        },
        responseError: function (response) {
            if (response.status === 401) {
                $window.localStorage.removeItem('api_token');
                window.location.href = '#/login';
            }
            return $q.reject(response);
        }
    };
}]);

gitafoodApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}]);
