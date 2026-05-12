gitafoodApp.controller('MainController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    // Initialize
    $scope.init = function () {
        var token = $window.localStorage.getItem('api_token');
        if (token) {
            $scope.isLoggedIn = true;
        }
    };

    // Login function
    $scope.login = function () {
        if (!$scope.email || !$scope.password) {
            alert('Please enter email and password');
            return;
        }

        $http.post('http://localhost:8000/api/login', {
            email: $scope.email,
            password: $scope.password
        }).then(function (response) {
            if (response.data.token) {
                $window.localStorage.setItem('api_token', response.data.token);
                $scope.isLoggedIn = true;
                window.location.href = '#/dashboard';
            }
        }).catch(function (error) {
            alert('Login failed: ' + (error.data.message || 'Invalid credentials'));
        });
    };

    // Logout function
    $scope.logout = function () {
        $window.localStorage.removeItem('api_token');
        $scope.isLoggedIn = false;
        window.location.href = '#/';
    };

    // Get user info
    $scope.getUser = function () {
        $http.get('http://localhost:8000/api/user').then(function (response) {
            $scope.user = response.data;
        }).catch(function (error) {
            console.error('Error fetching user:', error);
        });
    };

    $scope.init();
}]);
