gitafoodApp.controller('MainController', ['$scope', '$http', '$window', '$location', 'API_URL', function ($scope, $http, $window, $location, API_URL) {

    // Initialize
    $scope.init = function () {
        var token = $window.localStorage.getItem('api_token');
        $scope.isLoggedIn = !!token;
        $scope.loading = false;
        $scope.loginError = null;

        // If on dashboard and logged in, load user data
        if ($location.path() === '/dashboard' && token) {
            $scope.getUser();
            $scope.getBarang();
        }
    };

    // Login function
    $scope.login = function () {
        if (!$scope.email || !$scope.password) {
            $scope.loginError = 'Please enter email and password';
            return;
        }

        $scope.loading = true;
        $scope.loginError = null;

        $http.post(API_URL + '/login', {
            email: $scope.email,
            password: $scope.password
        }).then(function (response) {
            if (response.data.token) {
                // Store token in localStorage
                $window.localStorage.setItem('api_token', response.data.token);
                $scope.isLoggedIn = true;

                // Clear form
                $scope.email = '';
                $scope.password = '';
                $scope.loading = false;
                $scope.loginError = null;

                // Redirect to dashboard
                $location.path('/dashboard').replace();
            }
        }).catch(function (error) {
            $scope.loading = false;
            var message = (error.data && error.data.message) ? error.data.message : 'Invalid credentials';
            $scope.loginError = message;
        });
    };

    // Logout function
    $scope.logout = function () {
        var token = $window.localStorage.getItem('api_token');
        $scope.loading = true;

        if (token) {
            // Call logout endpoint
            $http.post(API_URL + '/logout').then(function (response) {
                completeLogout();
            }).catch(function (error) {
                // Even if logout fails, clear local token
                completeLogout();
            });
        } else {
            completeLogout();
        }

        function completeLogout() {
            $window.localStorage.removeItem('api_token');
            $scope.isLoggedIn = false;
            $scope.user = null;
            $scope.loading = false;
            $scope.email = '';
            $scope.password = '';

            $location.path('/').replace();
        }
    };

    // Get user info
    $scope.getUser = function () {
        $http.get(API_URL + '/user').then(function (response) {
            $scope.user = response.data;
        }).catch(function (error) {
            console.error('Error fetching user:', error);
            // If unauthorized, clear token and redirect
            if (error.status === 401) {
                $window.localStorage.removeItem('api_token');
                $location.path('/').replace();
            }
        });
    };

    // Load Barang Data
    $scope.barangList = [];
    $scope.pagination = {};
    
    $scope.getBarang = function (pageUrl) {
        var url = pageUrl || (API_URL + '/barang?per_page=5');
        $http.get(url).then(function(response) {
            $scope.barangList = response.data.data; // Laravel paginator wraps items in 'data'
            $scope.pagination = {
                current_page: response.data.current_page,
                last_page: response.data.last_page,
                next_page_url: response.data.next_page_url,
                prev_page_url: response.data.prev_page_url,
                links: response.data.links
            };
        }).catch(function(error) {
            console.error('Error fetching barang:', error);
        });
    };

    $scope.deleteBarang = function (id) {
        if(confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
            $http.delete(API_URL + '/barang/' + id).then(function(response) {
                alert('Barang berhasil dihapus');
                $scope.getBarang(); // refresh list
            }).catch(function(error) {
                alert('Gagal menghapus barang');
            });
        }
    };
    
    $scope.editBarang = function (barang) {
        alert('Fitur edit untuk ' + barang.nama_barang + ' belum diimplementasikan dengan Form UI khusus. Bisa dikembangkan lebih lanjut.');
    };

    // Initialize on controller load
    $scope.init();
}]);
