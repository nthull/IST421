angular.module('example').controller('ExampleController', ['$scope', '$http', 
    function ($scope, $http) {
        $scope.addCourse = function () {
            $http.post('/', { course: $scope.course });
        }
        $scope.name = "MEAN Application";
    }]);

angular.module('example').controller('showCourses', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('/courseList')
        .then(function (response) { $scope.courses = response.data })
}]);
		