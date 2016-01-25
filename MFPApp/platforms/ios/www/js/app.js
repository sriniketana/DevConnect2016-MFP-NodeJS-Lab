// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers','starter.services', 'ngCordova.plugins.camera','angularMoment','ngStorage'])

.run(function($ionicPlatform, MFPClientPromise) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    } 
     MFPClientPromise.then(function(){WL.Logger.ctx({pkg: 'io.ionic'}).debug('mfp and ionic are ready, safe to use WL.* APIs');});
  
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.chat', {
    url: '/chat',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat.html',
        controller: 'ChatCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/app/chat');
})

.filter('timeAgo', function () {
    return function (date) {
        if (!date) return;
        return moment(date, 'x').fromNow();
    }
})

.factory('MFPClientPromise', function($q){
  /* Setup a Promise to allow code to run in other places anytime after MFP CLient SDK is ready
     Example: MFPClientPromise.then(function(){alert('mfp is ready, go ahead and use WL.* APIs')});
  */
  return window.MFPClientDefer.promise;
});

window.Messages = {
  // Add here your messages for the default language.
  // Generate a similar file with a language suffix containing the translated messages.
  // key1 : message1,
};

window.wlInitOptions = {
  // Options to initialize with the WL.Client object.
  // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
};

window.MFPClientDefer = angular.injector(['ng']).get('$q').defer();;
window.wlCommonInit = window.MFPClientDefer.resolve;
window.MFPClientDefer.promise.then(function wlCommonInit(){
  // Common initialization code goes here or use the angular service MFPClientPromise
  
  console.log('MobileFirst Client SDK Initilized');
  mfpMagicPreviewSetup();
 });

function mfpMagicPreviewSetup(){
  var platform;
  //nothing to see here :-), just some magic to make ionic work with mfp preview, similar to ionic serve --lab
  if(WL.StaticAppProps.ENVIRONMENT === 'preview'){
    //running mfp preview (MBS or browser)
    platform = WL.StaticAppProps.PREVIEW_ENVIRONMENT === 'android' ? 'android' : 'ios';
    if(location.href.indexOf('?ionicplatform='+platform) < 0){
      location.replace(location.pathname+'?ionicplatform='+platform);
    }
  } 
}

