(function() {
  'use strict';
  var app = angular.module('CSapp', []);

  app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  });

  app.controller('MainCtrl', ['$scope', '$http', '$sce', function($s, $http, $sce) {
    var quotes = [];
    $s.currentQuote = $sce.trustAs($sce.HTML, "Loading...");
    $http({
      method: 'GET',
      url: '/quotes.json',
      responseType: 'json'
    }).then(function successCallback(response) {
        quotes = response.data;
        $s.newQuote();
    }, function errorCallback(response) {
      quotes = ["This website works perfectly.", "This website has no issues.", "This website didn't fail to load it's list of fake quotes."];
      $s.newQuote();
    });

    $s.newQuote = function() {
      var random;
      do {
        random = quotes[Math.floor(Math.random() * quotes.length)];
      } while (random == $s.currentQuote);
      $s.currentQuote = $sce.trustAs($sce.HTML, random);
    };
  }]);
})();
