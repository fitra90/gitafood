// AngularJS App Module
var gitafoodApp = angular.module('gitafoodApp', ['ngRoute']);

// Constants
gitafoodApp.constant('API_URL', 'http://localhost:8000/api');

// Route Configuration
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
        .otherwise({
            redirectTo: '/'
        });
}]);

// App Initialization and Route Guard
gitafoodApp.run(['$rootScope', '$window', '$location', function ($rootScope, $window, $location) {

    // Handle route changes for authentication
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        var token = $window.localStorage.getItem('api_token');
        var isLoginPage = next.$$route && next.$$route.originalPath === '/';
        var isDashboardPage = next.$$route && next.$$route.originalPath === '/dashboard';

        // Block access to dashboard without token
        if (isDashboardPage && !token) {
            event.preventDefault();
            $location.path('/');
            return;
        }

        // Redirect to dashboard if already logged in and trying to access login
        if (isLoginPage && token) {
            event.preventDefault();
            // Use replace to avoid adding to history
            $location.path('/dashboard').replace();
        }
    });

    // Check on app init if user should be redirected
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
