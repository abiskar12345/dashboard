( function() {
  'use strict';

  angular
    .module('innovationAngular', ['ui.router', 'ui.bootstrap','angular-carousel','LocalStorageModule','btford.socket-io'])


 .factory("Data", ['$http', '$location',
    function ($http, $q, $location) {
                var serviceBase = 'http://localhost:5000/';
        var obj = {};

        obj.get = function (q) { 
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
             return JSONH.unpack(results.data)
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        return obj;
        
       obj.postt = function (q, object) {
                    return $http.post(serviceBase + q, object).then(function (results) {
                        return results.data;
                    });
                };
        

}])

 .factory('auth',function () {

  var user;

return{
    setUser : function(aUser){
        user = aUser;
    },
    isLoggedIn : function(){
        return(user)? user : false;
    }
  }
   // body...
 })
 .factory('mySocket', function (socketFactory) {
    var myIoSocket = io.connect('http://localhost:5000/');

    mySocket = socketFactory({
      ioSocket: myIoSocket
    });
  
    return mySocket;
  })

.filter('unique', function() {
    return function(collection, primaryKey) { //no need for secondary key
      var output = [], 
          keys = [];
          var splitKeys = primaryKey.split('.'); //split by period


      angular.forEach(collection, function(item) {
            var key = {};
            angular.copy(item, key);
            for(var i=0; i<splitKeys.length; i++){
                key = key[splitKeys[i]];    //the beauty of loosely typed js :)
            }

            if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
            }
      });

      return output;
    };


})

 .filter('sumByKey', function() {
      return function(data,key) {
        if(typeof(data) == 'undefined' || typeof(key) == 'undefined') {
          return 0;
        }
        var sum = 0;
        for(var i=data.length-1; i>=0; i--) {
          sum+= parseFloat(data[i][key]);
        }
        return sum;
      }
    })

         .filter('unique', function () {
            return function (collection, primaryKey) { //no need for secondary key
                var output = [],
                    keys = [];
                var splitKeys = primaryKey.split('.'); //split by period


                angular.forEach(collection, function (item) {
                    var key = {};
                    angular.copy(item, key);
                    for (var i = 0; i < splitKeys.length; i++) {
                        key = key[splitKeys[i]]; //the beauty of loosely typed js :)
                    }

                    if (keys.indexOf(key) === -1) {
                        keys.push(key);
                        output.push(item);
                    }
                });

                return output;
            };
        })

         .filter('filtersearch',function()
{   return function(arr, searchString){ 
     if(!searchString){
          return arr;   }
        var result = [];
             angular.forEach(arr, function(item){
            if(item.string.indexOf(searchString) !== -1){
                 result.push(item);
                }
               });
        return result;
    };
});



})();
