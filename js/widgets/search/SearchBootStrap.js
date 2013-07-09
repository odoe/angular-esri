/**
 * @author rrubalcava@odoe.net (Rene Rubalcava)
 */
/*global define:true*/

(function() {
    "use strict";

    define([
        'widgets/search/Search',
        'widgets/search/SearchController',
        'widgets/search/SearchDirective'
    ], function(Search, SearchController, SearchDirective) {

        function init(App) {
            Search.start(App);
            SearchController.start(App);
            SearchDirective.start(App);
        }

        return { start: init };

    });

}).call(this);