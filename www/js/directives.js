angular.module('wpc.directives', [])

.directive('streamCard', ['$q', function($q) {
        return {
            templateUrl: 'templates/stream-card.html',
            'link': function($scope, $elem, $attrs) {

                function isImage(src) {

                    var deferred = $q.defer();

                    var image = new Image();
                    image.onerror = function() {
                        deferred.resolve(false);
                    };
                    image.onload = function() {
                        deferred.resolve(true);
                    };
                    image.src = src;

                    return deferred.promise;
                }
                var stream = $scope.stream;
                var link = stream.url;
                if (stream.site == 'youtube_stream') {
                    var videoid = link.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                    if(videoid != null) {
                        videoid = videoid[1];
                        var thumbnail = "http://img.youtube.com/vi/" + videoid + "/0.jpg";
                        isImage(thumbnail).then(function(result) {
                            if (result) {
                                stream.thumbnail = thumbnail;
                            }
                        });
                    }
                } else if(stream.site == 'twitch_stream') {
                    stream.thumbnail = '/img/twitch_logo.png';
                } else if(stream.site == 'wpc_stream') {
                    stream.thumbnail = '/img/wpc_logo.png';
                }
                $elem.on('click', function() {
                    window.open(stream.url, '_blank', 'location=yes');
                });
            }
        };
    }])

.directive('ionSearch', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
            },
            link: function(scope, element, attrs) {
                attrs.minLength = attrs.minLength || 0;
                scope.placeholder = attrs.placeholder || '';
                scope.search = {value: ''};

                scope.$watch('search.value', function(value) {
                    scope.$parent.filterStreams(value);
                });

                if (attrs.class)
                    element.addClass(attrs.class);

            },
            template: '<div class="item-input-wrapper">' +
                '<i class="icon ion-android-search"></i>' +
                '<input type="search" placeholder="{{placeholder}}" ng-model="search.value">' +
                '<i ng-if="search.value.length > 0" ng-click="clearSearch()" class="icon ion-close"></i>' +
                '</div>'
        };
    });