/**
 * @author rrubalcava@odoe.net (Rene Rubalcava)
 */
/*global define:true*/

(function() {
    "use strict";

    define([
        'angular',
        'esri/map'
    ], function(angular, Map) {

        function mapConfigs() {
            return {
                basemap: 'streets',
                center: [-118.1704035141802,34.03597014510993],
                zoom: 15
            };
        }

        function mapGen(elem) {
            return new Map(elem, mapConfigs());
        }

        function AppController($scope, $log) {
            $scope.map = mapGen('map');
        }

        function init(App) {
            App.controller('AppCtrl', ['$scope', '$log', AppController]);
            return AppController;
        }

        return { start: init };

    });

}).call(this);