app.controller('MainController', function($scope, $http){
  var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  var isFirefox = typeof InstallTrigger !== 'undefined';
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
  var isChrome = !!window.chrome && !isOpera;
  var isIE = false || !!document.documentMode;
  isOpera ? $scope.browser = 'Opera' : isFirefox ? $scope.browser = 'Firefox' : isSafari ?  $scope.browser = 'Safari' : isChrome ? $scope.browser = 'Chrome' : isIE ? $scope.browser = 'Internet Explorer' : "No browser detected";


  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() || false);
    }
  };

  if (isMobile.any()) {
    $scope.mobileDevice = isMobile.any().join();
  } else{
    $scope.notMobile = "Not a mobile device."
  }
  
  $http.get('/random').then(function(response){
    console.log(response.data);
  })

})
