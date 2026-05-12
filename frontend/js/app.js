var gitafoodApp = angular.module('gitafoodApp', ['ngRoute']);

gitafoodApp.constant('API_URL', 'http://localhost:8000/api');

// Route 
gitafoodApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    // Use hash bang mode for better compatibility
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'MainController'
        })
        .when('/form', {
            templateUrl: 'views/form.html',
            controller: 'FormBarangController'
        })
        .when('/form/:id', {
            templateUrl: 'views/form.html',
            controller: 'FormBarangController'
        })
        .when('/transaksi', {
            templateUrl: 'views/transaksi.html',
            controller: 'TransaksiController'
        })
        .when('/transaksi/form', {
            templateUrl: 'views/formTransaksi.html',
            controller: 'FormTransaksiController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

gitafoodApp.run(['$rootScope', '$window', '$location', function ($rootScope, $window, $location) {

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        var token = $window.localStorage.getItem('api_token');
        var isLoginPage = next.$$route && next.$$route.originalPath === '/';

        // Block access to any page other than login if without token
        if (!isLoginPage && !token) {
            event.preventDefault();
            $location.path('/');
            return;
        }

        // Redirect to dashboard if already logged in and trying to access login
        if (isLoginPage && token) {
            event.preventDefault();
            $location.path('/dashboard').replace();
        }
    });

    var token = $window.localStorage.getItem('api_token');
    var currentPath = $location.path();

    // If logged in but on login page, redirect to dashboard
    if (token && currentPath === '/') {
        $location.path('/dashboard').replace();
    }

    // If not logged in but on dashboard, redirect to login
    if (!token && currentPath === '/dashboard') {
        $location.path('/').replace();
    }
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
                window.location.href = '#/';
            }
            return $q.reject(response);
        }
    };
}]);

gitafoodApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}]);

// Navbar Controller for app-wide navigation logic
gitafoodApp.controller('NavbarController', ['$scope', '$http', '$window', '$location', 'API_URL', function ($scope, $http, $window, $location, API_URL) {
    $scope.isLoggedIn = function() {
        return !!$window.localStorage.getItem('api_token');
    };

    $scope.logout = function () {
        var token = $window.localStorage.getItem('api_token');
        if (!token) {
            completeLogout();
            return;
        }

        $http.post(API_URL + '/logout').then(function () {
            completeLogout();
        }).catch(function () {
            completeLogout();
        });

        function completeLogout() {
            $window.localStorage.removeItem('api_token');
            $location.path('/').replace();
        }
    };
}]);
