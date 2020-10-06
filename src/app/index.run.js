(function() {
  'use strict';

  angular
    .module('innovationAngular')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
