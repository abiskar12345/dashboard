


  (function() {
    'use strict';
  
    angular
      .module('innovationAngular')
      .controller('teamController', teamController);
  
    /** @ngInject */
    function teamController(Data,$scope,$rootScope,$window,$filter,$http ,localStorageService
        ) {  
      var vtm = this;
      vtm.addTeam = function (params) {
          Data.post('team',team).then(function (arg) {
              console.log(arg);
              
          });
          
      }


    };

   
  })();
  