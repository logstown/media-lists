(function() {
    'use strict';

    angular
        .module('mediaLists')
        .controller('ListsController', ListsController);

    /** @ngInject */
    function ListsController(movieDatabase, $mdDialog) {
        var vm = this;



        vm.showNewDialog = showNewDialog;
        vm.getMatches = getMatches;
        vm.addToList = addToList;

        activate();


        function activate() {
            movieDatabase.get('configuration')
                .then(function(result) {
                    console.log(result)
                    vm.imageUrl = result.images.base_url + 'w154'
                    vm.thumbUrl = result.images.base_url + 'w92';

                    vm.lists = [{
                        title: 'Text list',
                        items: [{
                            name: 'The Simpsons',
                            poster_path: "/yTZQkSsxUFJZJe67IenRM0AEklc.jpg",
                            id: 456,
                            first_air_date: '1990-08-09',
                            overview: "Seinfeld is an American television sitcom that originally aired on NBC from July 5, 1989, to May 14, 1998. It lasted nine seasons, and is now in syndication. It was created by Larry David and Jerry Seinfeld, the latter starring as a fictionalized version of himself. Set predominantly in an apartment block in Manhattan's Upper West Side in New York City, the show features a handful of Jerry's friends and acquaintances, particularly best friend George Costanza, former girlfriend Elaine Benes, and neighbor across the hall Cosmo Kramer."
                        }]
                    }];
                });
        }

        function showNewDialog(ev) {
            console.log(ev)
            var newDialog = $mdDialog.prompt()
                .title('Enter Title');

            $mdDialog.show(newDialog)
                .then(function(result) {
                    vm.lists.push({ title: result, items: [] })
                })
        }

        function getMatches(text, list) {
            return movieDatabase.get('search/tv', {
                    query: text,
                    search_type: 'ngram'
                })
                .then(function(response) {
                    return _.chain(response.results)
                        .filter('poster_path')
                        .reject(function(result) {
                            console.log([list.items, result.id])
                            return _.some(list.items, { id: result.id })
                        })
                        .value();
                })
        }

        var previousId = 0;

        function addToList(list) {
            if (!list.selectedItem || list.selectedItem.id === previousId) {
                return;
            }

            previousId = list.selectedItem.id;
            list.items.push(list.selectedItem);

            list.searchText = '';
        }
    }
})();
