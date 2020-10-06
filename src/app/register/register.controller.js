(function() {
  'use strict';

  angular
    .module('innovationAngular')
   
    .controller('registerController', registerController);

  /** @ngInject */
  function registerController( Data, $scope, $rootScope, $window, $http, $location, auth) {  
    var vmrs = this;
    var ab=[]


    $http.get('http://radhashree.com/api/v1/userlogin').then(function(argument){
      ab=argument;

    });


vmrs.register = function (argument) {
  argument['name']= argument.firstName +' '+ argument.lastName; 
  console.log(argument);

  if (argument.password===argument.confirmpassword) {


  $http.post('http://radhashree.com/api/v1/userregister',$scope.obj).then(function(arg){
    console.log(arg);

    if (arg.data.status=='success') {
         vmrs.message=" Account registered sucessfully";
        Data.post('userlogin',argument).then(function(a){
     if (a.data.status=='success') {
       $window.sessionStorage.setItem('45',JSON.stringify(a.data.user));    
       auth.setUser(a.data.user.email);  
      }

  });

    } 
    else{
      vmrs.message="The email is arleady used";
    }
  });

  } 
  else 
  {
       vmrs.message= "password do not match";
  }

}

vmrs.login= function (argument) {
  console.log(argument);


    $http.post('http://radhashree.com/api/v1/userlogin',argument).then(function(arg){
    console.log(arg);



     if (arg.data.status=='success') {
      $rootScope.ab= arg.data.user;
      $window.sessionStorage.setItem('45',JSON.stringify(arg.data.user));    
      auth.setUser(arg.data.user.email);
     $location.path('/myaccount1');


     
    }

  });





}


   }

})();
