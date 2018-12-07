angular.module('example').controller('ExampleController', ['$scope', '$http', 
    function () {
    }]);

angular.module('example').controller('courseController', function ($scope, $http) {
    $http.get('/courseList')
        .then(function (response) { $scope.courses = response.data; });

        $scope.studentAddCourse = function (course) {
            
            $http.put('/users/:username', course)
                .then(function (res) {

            });
    };
   
        $scope.studentDeleteCourse = function (course) {

        $http.delete('/users/:username', course)
            .then(function (res) {

            });
    };
    
    });

