gitafoodApp.controller('TransaksiController', ['$scope', '$http', '$location', '$window', 'API_URL', function ($scope, $http, $location, $window, API_URL) {
    // Auth check
    var token = $window.localStorage.getItem('api_token');
    if (!token) {
        $location.path('/').replace();
        return;
    }

    $scope.loading = false;
    $scope.transaksiList = [];

    $scope.kembali = function() {
        $location.path('/dashboard');
    };

    $scope.tambahTransaksi = function() {
        $location.path('/transaksi/form');
    };

    $scope.getTransaksi = function() {
        $scope.loading = true;
        $http.get(API_URL + '/transaksi_barang')
            .then(function(response) {
                $scope.loading = false;
                $scope.transaksiList = response.data;
            })
            .catch(function(error) {
                $scope.loading = false;
                console.error('Error fetching transaksi:', error);
            });
    };

    $scope.getTransaksi();
}]);
