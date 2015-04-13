angular.module('wpc.controllers', [])

.controller('LiveController', ['$scope', 'StreamService', function($scope, StreamService) {
        StreamService.query({'id': 'live'}, function(data) {
            $scope.streams = data;
        });

        $scope.doRefresh = function() {
            StreamService.query({'id': 'live'}, function(data) {
                $scope.streams = data;
            });

            $scope.$broadcast('scroll.refreshComplete');

            $scope.$apply();
        }
    }])

.controller('UpcomingController', ['$scope', 'StreamService', function($scope, StreamService) {

        /*
        var cordova = window.cordova = {
            plugins: {
                notification: {
                    local: {
                        internalStorage: [],
                        schedule: function(obj) {
                            console.debug("Trying to schedule notification", obj);
                            this.internalStorage.push(obj.id);
                        },
                        isPresent: function(id, callback) {
                            console.debug("Checking if #" + id + " is present");
                            var found = (this.internalStorage.indexOf(id) != -1);
                            callback(found);
                        }
                    }
                }
            }
        };
        */

        var updateSchedules = function(streams) {
	    return;
            if ("undefined" !== typeof cordova && "undefined" !== typeof cordova.plugins.notification.local) {
                for (var i = 0; i < streams.length; i++) {
                    var stream = streams[i];
                    cordova.plugins.notification.local.isPresent(stream.id, (function(stream) { return function (present) {
                        console.debug("Registering new push notification");
                        if (!present) {
                            if ("undefined" === typeof stream.scheduled_start_time || stream.scheduled_start_time == null)
                                return;
                            var ts = Date.parse(stream.scheduled_start_time);
                            var title = stream.title ? stream.title : 'Stream of ' + stream.user;
                            cordova.plugins.notification.local.schedule({
                                id: stream.id,
                                text: stream.user + " is streaming '" + title + "'",
                                at: ts,
                                data: { streamId: stream.id }
                            });
                        }
                    }}(stream)));
                }
            }
        };

        $scope.type = 'upcoming';

        StreamService.query({'id': 'upcoming'}, function(data) {
            $scope.streams = data;
            updateSchedules(data);
        });

        $scope.doRefresh = function() {
            StreamService.query({'id': 'upcoming'}, function(data) {
                $scope.streams = data;
                updateSchedules(data);
            });

            $scope.$broadcast('scroll.refreshComplete');

            $scope.$apply();
        }
    }])

.controller('RecordedController', ['$scope', 'StreamService', function($scope, StreamService) {
        var streams = [];

        var escapeRegExp = function(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&").replace(/\*/, ".*");
        };
        StreamService.query({'id': 'completed'}, function(data) {
            streams = data;
            $scope.streams = streams;
        });
        $scope.doRefresh = function() {
            StreamService.query({'id': 'completed'}, function(data) {
                streams = data;
                $scope.streams = streams;
            });

            $scope.$broadcast('scroll.refreshComplete');

            $scope.$apply();
        }
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
