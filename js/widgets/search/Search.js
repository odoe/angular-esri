/**
 * @author rrubalcava@odoe.net (Rene Rubalcava)
 */
/*global define:true*/

(function () {
    "use strict";

    define([
        'dojo/_base/lang',
        'esri/tasks/QueryTask',
        'esri/tasks/query'
    ], function (lang, QueryTask, Query) {

        var url = 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/5',
            qTask = new QueryTask(url);

        function queryGen(params) {
            return  lang.mixin(new Query(), params);
        }

        function stateQuery(name, sr) {
            return queryGen({
                where: ["STATE_NAME LIKE '", name, "%'"].join(''),
                outFields: ['*'],
                returnGeometry: true,
                outSpatialReference: sr
            });
        }

        function SearchService($q) {

            return {
                getState: function (name, sr) {
                    var deferred = $q.defer();
                    qTask.execute(stateQuery(name, sr)).then(
                        function (featureSet) {
                            deferred.resolve(featureSet);
                        },
                        function (error) {
                            deferred.reject(error);
                        });
                    return deferred.promise;
                }
            };

        }

        function init(App) {
            App.factory('SearchSrvc', ['$q', SearchService]);
            return SearchService;
        }

        return { start: init };

    });

}).call(this);