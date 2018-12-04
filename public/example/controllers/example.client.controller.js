angular.module('example').controller('ExampleController', ['$scope', '$http', 
    function () {
    }]);

angular.module('example').controller('courseController', function ($scope, $http) {
        $http.get('/courseList')
        .then(function (response) { $scope.courses = response.data })

        $scope.studentAddCourse = function () {
            $http.put('/courseList', $scope.course ).success(function (addCourse) {

            });
        };
    
    });

