angular.module('wpc.services', [])

.factory('StreamService', ['$resource', function($resource) {
    return $resource('http://watchpeoplecode.com/json');
}]);
