(function() {
  'use strict';

  angular
    .module('innovationAngular')
    .run(routeConfig1)
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vmh'
        });
       $stateProvider
       .state('members', {
        url: '/members',
        templateUrl: 'app/members/member.html',
        controller: 'memberController',
        controllerAs: 'vmm'
        }); 
      
       $stateProvider
       .state('addteam',{
        url:'/addteam',
        templateUrl: 'app/addteam/addTeam.html',
        controller: 'teamController',
        controllerAs: 'vtm'
       });
      //  $stateProvider
      //  .state('wishlist',{
      //   url:'/wishlist',
      //   templateUrl: 'app/wishlist/wishlist.html',
      //   controller:'wishlistController',
      //   controllerAs:'vmw'
      //  });
     
      //   $stateProvider
      //  .state('aboutus',{
      //   url:'/aboutus',
      //   templateUrl: 'app/aboutUs/aboutus.html',
      //   controller:'aboutusController',
      //   controllerAs:'vmas'
      //  });
      //   $stateProvider
      //  .state('compare',{
      //   url:'/compare',
      //   templateUrl: 'app/compare/compare.html',
      //   controller:'compareController',
      //   controllerAs:'vmcp'
      //  });
      //    $stateProvider
      //  .state('faq',{
      //   url:'/faq',
      //   templateUrl: 'app/faq/faq.html',
      //   controller:'faqController',
      //   controllerAs:'vmfq'
      //  });
      //    $stateProvider
      //  .state('contact',{
      //   url:'/contact',
      //   templateUrl: 'app/contact/contact.html',
      //   controller:'contactController',
      //   controllerAs:'vmct'
      //  });
      //   $stateProvider
      //  .state('blog',{
      //   url:'/blog',
      //   templateUrl: 'app/blog/blog.html',
      //   controller:'blogController',
      //   controllerAs:'vmbg'
      //  });
      //    $stateProvider
      //  .state('details',{
      //   url:'/details/:detailsCode',
      //   templateUrl: 'app/details/details.html',
      //   controller:'detailsController',
      //   controllerAs:'vmds'
      //  });
      //   $stateProvider
      //  .state('shop',{
      //   url:'/shop',
      //   templateUrl: 'app/shop/shop.html',
      //   controller:'shopController',
      //   controllerAs:'vms'
      //  });
      //  $stateProvider
      //  .state('shopc',{
      //   url:'/shopc/:name',
      //   templateUrl: 'app/shopc/shopc.html',
      //   controller:'shopcController',
      //   controllerAs:'vmsc'
      //  });
       $stateProvider
       .state('register',{
        url:'/register',
        templateUrl: 'app/register/register.html',
        controller:'registerController',
        controllerAs:'vmrs',
       });
      //   $stateProvider
      //  .state('mobilecat',{
      //   url:'/mobilecat',
      //   templateUrl: 'app/mobilecategory/mobilecat.html',
      //   controller:'mobcatController',
      //   controllerAs:'vmmc',
      //  });



      //  $stateProvider
      //  .state('myaccount',{
      //   url:'/myaccount',
      //   controller :function (auth, $location) {
      //           if (!auth.isLoggedIn()) {
      //               $location.path('/register');
      //           } else {
      //               $location.path('/myaccount1');
      //           }
      //       }
      //   // templateUrl: 'app/myaccount/myaccount.html',
      //   // controller: 'accountController',
      //   // controllerAs: 'vmaa'
      //  });

      //   $stateProvider
      //  .state('myaccount1',{
      //   url:'/myaccount1',
       
      //   templateUrl: 'app/myaccount/myaccount.html',
      //   controller: 'accountController',
      //   controllerAs: 'vmaa'
      //     });
      //  $stateProvider
      //  .state('quotation',{
      //  url:'/quotation/:qcode',
      //  templateUrl:'app/quotation/quotation.html',
      //  controller:'quotationController',
      //  controllerAs:'vmq'
         
      //  });






    $urlRouterProvider.otherwise('/');
  }

  function routeConfig1($rootScope, $urlRouter, $location, Data,$state,$filter) {
$rootScope.$on("$stateChangeStart", function (event, next, current,toState,fromState) {
  
  $rootScope.currentState = current.name;
 window.scrollTo(0,0);


});
$urlRouter.listen();
}

})();
