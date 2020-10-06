


  (function() {
    'use strict';
  
    angular
      .module('innovationAngular')
      .controller('memberController', memberController);
  
    /** @ngInject */
    function memberController(Data,$scope,$rootScope,$window,$filter,$http ,localStorageService) {  
      var vmm = this;

     Data.get('user').then(function (argument) {
      $rootScope.profiles = argument.result;
      console.log(argument.result);
        $window.localStorage.setItem('profiles',JSON.stringify(argument));
      },function(err) {
        $rootScope.profiles = $window.localStorage.getItem('profiles');
      });
    
     };

     var modalWrapper = document.querySelector('.modal-wrapper')
var close = document.querySelector('.close');
var open = document.querySelector('.openModal')


close.addEventListener('click', function(){
    modalWrapper.style.display = "none"
})

open.addEventListener('click', function(){
    modalWrapper.style.display = "block"
})

window.onclick = function(event) {
    if (event.target == modalWrapper) {
      modalWrapper.style.display = "none";
    }
  }
   
  })();
  