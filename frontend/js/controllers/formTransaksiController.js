gitafoodApp.controller('FormTransaksiController', ['$scope', '$http', '$location', '$window', 'API_URL', function ($scope, $http, $location, $window, API_URL) {
    // Auth check
    var token = $window.localStorage.getItem('api_token');
    if (!token) {
        $location.path('/').replace();
        return;
    }

    $scope.loading = false;
    $scope.successMessage = '';
    $scope.errorMessage = '';
    
    $scope.barangList = [];
    $scope.stokError = false;
    $scope.currentStok = 0;

    // Initialize Form Data
    $scope.formData = {
        barang_id: '',
        tipe_transaksi: 'masuk',
        kuantitas: 1,
        keterangan: ''
    };

    $scope.kembali = function() {
        $location.path('/transaksi');
    };

    // Load Barang Data for Select
    $scope.getBarangOptions = function () {
        $http.get(API_URL + '/barang?per_page=1000') // Get all without small pagination for select box
            .then(function(response) {
                // Determine structure (paginated vs all)
                if (response.data && response.data.data) {
                    $scope.barangList = response.data.data;
                } else {
                    $scope.barangList = response.data;
                }
            })
            .catch(function(error) {
                console.error('Error fetching barang:', error);
            });
    };

    $scope.checkStok = function() {
        $scope.stokError = false;
        $scope.currentStok = 0;

        if (!$scope.formData.barang_id || !$scope.formData.tipe_transaksi || !$scope.formData.kuantitas) {
            return;
        }

        // Find selected barang
        var selectedBarang = $scope.barangList.find(function(b) {
            return b.id === $scope.formData.barang_id;
        });

        if (selectedBarang) {
            $scope.currentStok = selectedBarang.stok;
            
            if ($scope.formData.tipe_transaksi === 'keluar' && $scope.formData.kuantitas > selectedBarang.stok) {
                $scope.stokError = true;
            }
        }
    };

    $scope.submitForm = function() {
        // Double check stok
        $scope.checkStok();
        if ($scope.stokError) return;

        $scope.loading = true;
        $scope.successMessage = '';
        $scope.errorMessage = '';

        $http.post(API_URL + '/transaksi_barang', $scope.formData)
            .then(function(response) {
                $scope.loading = false;
                $scope.successMessage = response.data.message || 'Transaksi berhasil dicatat!';
                
                // Refresh list of barang to get latest stock
                $scope.getBarangOptions();

                // Reset form partially
                $scope.formData.kuantitas = 1;
                $scope.formData.keterangan = '';
                
                if ($scope.transaksiForm) {
                    $scope.transaksiForm.$setPristine();
                    $scope.transaksiForm.$setUntouched();
                }
            })
            .catch(function(error) {
                $scope.loading = false;
                if (error.data && error.data.message) {
                    $scope.errorMessage = error.data.message;
                } else {
                    $scope.errorMessage = 'Terjadi kesalahan saat menyimpan transaksi.';
                }
            });
    };

    // Initialize
    $scope.getBarangOptions();
}]);
