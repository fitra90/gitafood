gitafoodApp.controller('FormBarangController', ['$scope', '$http', '$location', '$window', '$routeParams', 'API_URL', function ($scope, $http, $location, $window, $routeParams, API_URL) {
    
    // Auth check
    var token = $window.localStorage.getItem('api_token');
    if (!token) {
        $location.path('/').replace();
        return;
    }

    $scope.loading = false;
    $scope.successMessage = '';
    $scope.errorMessage = '';

    // Initialize Form Data
    $scope.formData = {
        kode_barang: '',
        nama_barang: '',
        kategori: '',
        satuan: 'pcs',
        harga_beli: 0,
        harga_jual: 0,
        stok: 0
    };
    
    $scope.isEdit = false;
    $scope.barangId = $routeParams.id;

    if ($scope.barangId) {
        $scope.isEdit = true;
        $scope.loading = true;
        $http.get(API_URL + '/barang/' + $scope.barangId)
            .then(function(response) {
                $scope.loading = false;
                $scope.formData = response.data.data;
            })
            .catch(function(error) {
                $scope.loading = false;
                $scope.errorMessage = 'Gagal memuat data barang.';
            });
    }

    $scope.kembali = function() {
        $location.path('/dashboard');
    };

    $scope.submitForm = function() {
        $scope.loading = true;
        $scope.successMessage = '';
        $scope.errorMessage = '';

        var requestUrl = API_URL + '/barang';
        var requestMethod = $http.post;
        
        if ($scope.isEdit) {
            requestUrl = API_URL + '/barang/' + $scope.barangId;
            requestMethod = $http.put;
        }

        requestMethod(requestUrl, $scope.formData)
            .then(function(response) {
                $scope.loading = false;
                $scope.successMessage = response.data.message || ($scope.isEdit ? 'Barang berhasil diupdate!' : 'Barang berhasil ditambahkan!');
                
                if (!$scope.isEdit) {
                    // Reset form only if creating
                    $scope.formData = {
                        kode_barang: '',
                        nama_barang: '',
                        kategori: '',
                        satuan: 'pcs',
                        harga_beli: 0,
                        harga_jual: 0,
                        stok: 0
                    };
                    
                    // Clear validation state
                    if ($scope.barangForm) {
                        $scope.barangForm.$setPristine();
                        $scope.barangForm.$setUntouched();
                    }
                }
            })
            .catch(function(error) {
                $scope.loading = false;
                if (error.data && error.data.message) {
                    $scope.errorMessage = error.data.message;
                } else {
                    $scope.errorMessage = 'Terjadi kesalahan saat menyimpan data.';
                }
            });
    };
}]);
