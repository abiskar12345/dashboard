(function() {
  'use strict';

  angular
    .module('innovationAngular')
   
    .controller('shopController', shopController);

  /** @ngInject */
  function shopController(Data,$scope,$rootScope,$window,$filter,$stateParams) {

  var vms = this;

//   if ($rootScope.category===undefined) {
//   $rootScope.category = JSON.parse($window.localStorage.getItem('category')) ;
    
// }

//   vms.category = $rootScope.category;

  if ($rootScope.products===undefined) {
  $rootScope.profiles =JSON.parse($window.localStorage.getItem('product')) ;  
}

  vms.profiles = $rootScope.pruofiles;
   var a = $filter('filter')($rootScope.profiles, {
     'gender': 'male',
    },true);

    var b =$filter('filter')($rootScope.profiles, {
    'gender': 'female',
      },true);  


   if (a!= null) {
        vms.subcat=a[0].pc; 
      }
 vms.paging= function (obj) {
  
    console.log(obj);
    if (obj=="pre" && vms.begin>14){

 
      vms.begin = vms.begin - 15;
  
      }

 if (obj=="next"  && vms.begin<(a.length-15))
 {
  vms.begin = vms.begin + 15;
 }
 window.scrollTo(0,280);
 console.log(vms.begin)

 };
   
  };

  

})();
