(function() {
  'use strict';

  angular
    .module('innovationAngular')
    .directive('acmeNavbar', acmeNavbar)
    .directive('acmeHeader', acmeHeader)
    .directive('acmeSearch',acmeSearch)
    .directive('acmeMobile',acmeMobile);


  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(Data, $scope, $timeout, $rootScope, $filter,$location ,$window,auth, localStorageService) {
      var vm = this;
      var compareStatus; 
      vm.product=$rootScope.products;
      vm.act= window.location.hash;
      var user = JSON.parse($window.sessionStorage.getItem('45'));

    
        if (user==undefined) { 
      vm.account = 'my account';
      auth.setUser();
  
     } 
     else {
  
  vm.account  = user.firstname;
  auth.setUser(user.email);
    }
    Data.get('user').then(function (argument) {
        $rootScope.profiles = argument.data;
        console.log(argument.data);    
        });



 // // search----autocomplete  
 // vm.filterItems=function (argument) {
 //   var output=[];
 //   vm.hide= false;
 //   // body...

 // angular.forEach($rootScope, function(product) {
 //        if (product.name.toLowerCase() === argument.toLowerCase()) {
 //            output.push(product);
 //        }
 // });

 // vm.filterProducts=output; 

 // } 

 }
}

   function acmeMobile() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/navbar/mobile.html',
            controller: MobileController,
            controllerAs: 'vmmo',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function MobileController(Data, $rootScope, $scope, $state, $window) {
            var vmmo = this;
            vmmo.moreClick = moreClick;

            function moreClick() {
                if (typeof Android == "undefined") {
                    // do something if is NOT a web view
                    document.getElementById('backdrop').style.display = 'block';
                    var side = document.getElementById('sidebar');
                    side.style.display = 'block';
                    setTimeout(function () {
                        side.classList.add('show');
                    }, 10);
                } else {
                    // do something else if is a web view
                    Android.openDrawer();
                }
            }

            vmmo.closeBackdrop = function () {
                document.getElementById('backdrop').style.display = 'none';
                var side = document.getElementById('sidebar');
                side.classList.remove('show');
                setTimeout(function () {
                    side.style.display = 'none';
                }, 600);
            }

            $scope.javaScriptCallAngular = function (value) {
                console.log(value);
                $state.go(value);
            }


        }

    }

    function acmeHeader() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/navbar/header.html',
      controller: headerController,
      controllerAs: 'vmh',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function headerController() {
      var vmf = this;
    }
  }


   




    function acmeSearch($state, $timeout, $rootScope, $filter) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/navbar/search.html',
            controller: SearchController,
            controllerAs: 'nepkoder',
            bindToController: true,
            link: function (scope, elem, attrs, controller) {
                var vmsc = controller;
                vmsc.lastSearchTerm = null;
                vmsc.currentIndex = null;
                vmsc.justChanged = false;
                vmsc.searchTimer = null;
                vmsc.hideTimer = null;
                vmsc.searching = false;
                vmsc.pause = 100;
                vmsc.minLength = 2;
                vmsc.searchStr = null;

                var isNewSearchNeeded = function (newTerm, oldTerm) {
                    return newTerm.length >= vmsc.minLength && newTerm != oldTerm
                }

                vmsc.searchTimerComplete = function (str) {
                    // Begin the search
                    if (str.length >= vmsc.minLength) {
                        var myData = $rootScope.products;
                        if (myData) {
                            // var searchFields = vm.searchFields.split(",");
                            var searchFields = ['name', 'category', 'brand'];

                            var matches = [];

                            for (var i = 0; i < myData.length; i++) {
                                var match = false;

                                for (var s = 0; s < searchFields.length; s++) {
                                    match = match || (typeof myData[i][searchFields[s]] === 'string' && typeof str === 'string' && myData[i][searchFields[s]].toLowerCase().indexOf(str.toLowerCase()) >= 0);

                                }

                                if (match) {
                                    matches[matches.length] = myData[i];
                                }
                            }
                            vmsc.searching = false;
                            vmsc.results = matches;
                        }
                    }
                }

                vmsc.hideResults = function () {

                    vmsc.hideTimer = $timeout(function () {
                        vmsc.showDropdown = false;
                    }, vmsc.pause);
                };

                vmsc.resetHideResults = function () {
                    // if (vm.hideTimer) {
                    //     $timeout.cancel(vm.hideTimer);
                    // };
                    if (vmsc.searchStr) {
                        vmsc.showDropdown = true;
                        vmsc.searchTimerComplete(vmsc.searchStr);
                    }
                };

                vmsc.keyPressed = function (event) {
                    if (!(event.which == 38 || event.which == 40 || event.which == 13)) {

                        if (!vmsc.searchStr || vmsc.searchStr == "") {
                            vmsc.showDropdown = false;
                            vmsc.lastSearchTerm = null

                        } else if (isNewSearchNeeded(vmsc.searchStr, vmsc.lastSearchTerm)) {
                            vmsc.lastSearchTerm = vmsc.searchStr
                            vmsc.showDropdown = true;
                            vmsc.currentIndex = -1;
                            vmsc.results = [];

                            if (vmsc.searchTimer) {
                                $timeout.cancel(vmsc.searchTimer);
                            }

                            vmsc.searching = true;

                            vmsc.searchTimer = $timeout(function () {
                                vmsc.searchTimerComplete(vmsc.searchStr);
                            }, vmsc.pause);
                        }

                    } else {
                        event.preventDefault();
                    }
                }


                vmsc.selectResult = function (result) {

                    $state.go('product', {
                   id: result.id
                    });
                    vmsc.searchStr = "";
                    vmsc.showDropdown = false;
                    vmsc.results = [];

                }
                


                // arrow ops
                var inputField = elem.find('input');

                inputField.on('keyup', vmsc.keyPressed);

                elem.on("keyup", function (event) {
                    if (event.which === 40) {
                        if (vmsc.results && (vmsc.currentIndex + 1) < vmsc.results.length) {
                            vmsc.currentIndex++;
                            scope.$apply();

                            event.preventDefault;
                            event.stopPropagation();
                        }

                        scope.$apply();
                    } else if (event.which == 38) {
                        if (vmsc.currentIndex >= 1) {
                            vmsc.currentIndex--;
                            scope.$apply();
                            event.preventDefault;
                            event.stopPropagation();
                        }

                    } else if (event.which == 13) {

                        if (vmsc.results && vmsc.currentIndex >= 0 && vmsc.currentIndex < vmsc.results.length) {
                            vmsc.selectResult(vmsc.results[vmsc.currentIndex]);
                            scope.$apply();
                            event.preventDefault;
                            event.stopPropagation();
                        } else {
                            vmsc.selectResult(vmsc.results[0]);
                            vmsc.results = [];
                            scope.$apply();
                            event.preventDefault;
                            event.stopPropagation();
                        }

                    } else if (event.which == 27) {
                        vmsc.results = [];
                        vmsc.showDropdown = false;
                        scope.$apply();
                    } else if (event.which == 8) {
                        vmsc.selectedObject = null;
                        scope.$apply();
                    }

                     
                });

            }

        };

        return directive;

        /** @ngInject */
        function SearchController() {
            var vms = this;

            // result check for noresult text
            vms.noResults = function (searching, results) {
                if (!searching && (!results || results.length == 0)) {
                    return true;
                }
                return false;
            }
        }
    }
})();
