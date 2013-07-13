/**
 * @author rrubalcava@odoe.net (Rene Rubalcava)
 */
/*global define:true*/

(function () {
    "use strict";

    define([
        'dojo/_base/array',
        'text!widgets/search/template/search.tpl.html'
    ], function (array, tpl) {

        function head(t) {
            return t[0];
        }

        function upper(txt) {
            return [txt.charAt(0).toUpperCase(), txt.substr(1).toLowerCase()].join('');
        }

        function titleCase(str) {
            return str.replace(/\w\S*/g, upper);
        }

        function matchedItem(items, val) {
            return head(array.filter(items, function (item) {
                return item.label === val;
            }));
        }

        function SearchDirective($timeout, $log) {
            return {
                restrict: 'A',
                template: tpl,
                controller: 'SearchCtrl',
                link: function (scope, element) {

                    scope.$watch('selected', function (val) {
                        if (val) {
                            scope.zoom(matchedItem(scope.items, val));
                        }
                    });

                    element.bind('keyup', function (e) {
                        var term = e.target.value;
                        if (term.length > 2) {
                            $log.info('search for something', term);
                            scope.find(titleCase(term));
                        } else {
                            $log.info('reset list of items');
                            scope.items = [
                                {label: ''}
                            ];
                        }
                    });

                    scope.getItems = function () {
                        return $timeout(function () {
                            $log.info('return items', scope.items);
                            return scope.items;
                        }, 500);
                    };
                }
            };
        }

        function init(App) {
            App.directive('search', ['$timeout', '$log', SearchDirective]);
            return SearchDirective;
        }

        return { start: init };

    });

}).call(this);