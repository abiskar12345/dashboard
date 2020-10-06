(function() {
    'use strict';
  
    angular
      .module('innovationAngular')
      .controller('HomeController', HomeController);
  
    /** @ngInject */
    function HomeController(Data,$scope,$rootScope,$window,$filter, localStorageService,mySocket) {  
      var vmh = this;
      var  profiles;
      mySocket.emit("hello");
      Data.get('user').then(function (argument) {
        $rootScope.profiles = argument.data;
        profiles=argument.data
        console.log(argument.data);
  
        var a = $filter('filter')($rootScope.profiles, {
          '_gender': '1',
         },true);
     
         var b =$filter('filter')($rootScope.profiles, {
         '_gender': '2',
           },true);
          
  
           $scope.males =a.length;
           $scope.females =b.length;
           $scope.total  =profiles.length;
    
  
       
        });  
    
  
     };
  })();
  