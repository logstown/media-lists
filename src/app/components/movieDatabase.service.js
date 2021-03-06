(function() {
    'use strict';

    angular
        .module('mediaLists')
        .factory('movieDatabase', movieDatabase);

    /** @ngInject */
    function movieDatabase($http) {
        var API_KEY = 'e71bd965e4a75d68bf310cd490673dc3',
            BASE_URI = 'http://api.themoviedb.org/3/';

        var service = {
            get: get
        };

        return service;

        function get(url, params) {
            var fullUrl = BASE_URI + url;
            params = params || {};

            params.api_key = API_KEY;

            return $http.get(fullUrl, {
                    params: params,
                    cache: true
                })
                .then(function(result) {
                    return result.data;
                })
        }
    }
})();
