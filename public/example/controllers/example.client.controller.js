angular.module('example').controller('ExampleController', ['$scope',
    function ($scope, $http) {
        $scope.name = "Add Courses";
        $http.get('psuCourses.json')
            .then(function (res) {
                $scope.courseID = res.data;
            })
    }]);