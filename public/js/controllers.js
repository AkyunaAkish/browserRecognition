app.controller('MainController', function($scope, $http){

  //Variables that contain booleans determining if a particular browser is present or not
  var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  var isFirefox = typeof InstallTrigger !== 'undefined';
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
  var isChrome = !!window.chrome && !isOpera;
  var isIE = false || !!document.documentMode;

  //Ternary statement to properly set $scope.browser to the correct browser
  isOpera ? $scope.browser = 'Opera' : isFirefox ? $scope.browser = 'Firefox' : isSafari ?
  $scope.browser = 'Safari' : isChrome ? $scope.browser = 'Chrome' : isIE ?
  $scope.browser = 'Internet Explorer' : "No browser detected";


  //isMobile object containing methods to determine if a mobile device is present
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

  //if/else statement to set $scope variables for rendering if a mobile device is
  //present or not in HTML
  if (isMobile.any()) {
    $scope.mobileDevice = isMobile.any().join();
  } else{
    $scope.notMobile = "Not a mobile device."
  }

  //On page load an http post request will be sent to the express backend
  //where the server's logic will determine if the current browser
  //and device type needs to be assigned an ID or not
  $http.post('/addBrowser', {isMobile: isMobile.any(), browser: $scope.browser}).then(function(response){
    //Then the server responds back with either the newly inserted item
    //or reuses a previously created item that matches the
    //current browser and device type
    $scope.currentState = response.data;
  })
  
})
