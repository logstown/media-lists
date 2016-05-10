(function() {
  'use strict';

  angular
    .module('mediaLists')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
