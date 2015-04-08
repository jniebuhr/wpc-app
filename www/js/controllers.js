angular.module('wpc.controllers', [])

.controller('LiveController', ['$scope', 'StreamService', function($scope, StreamService) {
        StreamService.get(function(data) {
            $scope.streams = data.live;
        });
    }])

.controller('UpcomingController', ['$scope', 'StreamService', function($scope, StreamService) {
        StreamService.get(function(data) {
            $scope.streams = data.upcoming;
        });
    }])

.controller('RecordedController', ['$scope', 'StreamService', function($scope, StreamService) {
        var streams = [];

        var escapeRegExp = function(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&").replace(/\*/, ".*");
        };
        StreamService.get(function(data) {
            streams = data.completed;
            $scope.streams = streams;
        });
        $scope.filterStreams = function(term) {
            var expression = '.*' + escapeRegExp(term) + '.*';
            var regex = new RegExp(expression, "i");
            var filteredStreams = [];
            for (var i = 0; i < streams.length; i++) {
                var stream = streams[i];
                if (regex.test(stream.title)) {
                    filteredStreams.push(stream);
                }
            }
            $scope.streams = filteredStreams;
        };
    }]);