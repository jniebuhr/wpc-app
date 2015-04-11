angular.module('wpc.services', [])

.factory('StreamService', ['$resource', function($resource) {
    return $resource(
        'http://www.watchpeoplecode.com/api/v:version/streams/:id',
        {
            'version': 1,
            'id': 'live'
        },
        {
            'get': {
                method: 'GET',
                isArray: false,
                transformResponse: function(data) {
                    data = angular.fromJson(data);
                    return data.data;
                }
            },
            'query': {
                method: 'GET',
                isArray: true,
                transformResponse: function(data) {
                    data = angular.fromJson(data);
                    return data.data;
                }
            }
        }
    );
}]);
