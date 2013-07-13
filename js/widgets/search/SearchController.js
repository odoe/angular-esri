/**
 * @author rrubalcava@odoe.net (Rene Rubalcava)
 */
/*global define:true*/

(function() {
    "use strict";

    define([
        'dojo/_base/array',
        'helpers/symbolhelper'
    ], function(array, sym) {

        function mappedItems(feature) {
            return {
                label: feature.attributes.STATE_NAME,
                value: feature.attributes.STATE_NAME,
                feature: feature
            };
        }

        function handler(data, func) {
            return array.map(data, func);
        }

        function setSymbol(graphic) {
            graphic.setSymbol(sym.polygonSymbol());
            return graphic;
        }

        function SeachController($scope, $log, SearchSrvc) {
            $scope.items = [{label:''}];

            $scope.find = function(name) {
                $log.info('perform search in controller: ', name);
                SearchSrvc.getState(name, $scope.map.spatialReference)
                    .then(function(featureSet){
                        $log.info('query results', featureSet);
                        $scope.items = handler(featureSet.features, mappedItems);
                    });
            };

            $scope.zoom = function(item) {
                $log.info('add to map and zoom', item);
                $scope.map.graphics.clear();

                $scope.map.setExtent(item.feature.geometry.getExtent(), true)
                    .then(function() {
                        $scope.map.graphics.add(setSymbol(item.feature));
                    });
            };
        }

        function init(App) {
            App.controller('SearchCtrl', ['$scope', '$log', 'SearchSrvc', SeachController]);
            return SeachController;
        }

        return { start: init };

    });

}).call(this);