angular.module('wpc.directives', [])

.directive('streamCard', [function() {
        return {
            templateUrl: 'templates/stream-card.html',
            'link': function($scope, $elem, $attrs) {
                var stream = $scope.stream;
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