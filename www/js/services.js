angular.module('wpc.services', [])

.factory('StreamService', ['$resource', function($resource) {
    return $resource('http://www.watchpeoplecode.com/json');
}]);
