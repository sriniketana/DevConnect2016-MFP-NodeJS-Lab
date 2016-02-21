angular.module('starter.controllers', [])

.controller('ChatCtrl', function ($scope, $ionicModal, $localStorage, $sessionStorage, Camera, SocketIO) {
	var ChatManager = SocketIO;

  $scope.isWebView = window.location.protocol === 'file:';
  $scope.$storage = $scope.isWebView ? $localStorage : $sessionStorage;
  $scope.posts = ChatManager.posts;
  
	function addPost(message, img) {
		ChatManager.add({
			message: message ? message : null,
			img: img ? img : null,
			timestamp: new Date().getTime(),
      user: $scope.$storage.handle,
      avatar: $scope.$storage.avatar
		});
	}
  
	$scope.add = function (message) {
		addPost(message);
		$scope.message = null; // pretty things up
	};

	$scope.takePicture = function () {
		Camera.takePicture().then(function (photo) {
			addPost(null, photo);
		});
	};

})

.controller('AppCtrl', function($window, $http, $scope, $ionicModal, $localStorage, $sessionStorage, randomAvatar, SocketIO, $ionicLoading, MFPClientPromise, MFPServices) {
	var ChatManager = SocketIO;
  
  $scope.isWebView = window.location.protocol === 'file:';
  $scope.$storage = $scope.isWebView ? $localStorage : $sessionStorage;

  $scope.save = function () {
    ChatManager.add({
			message: 'Joined',
			img: null,
			timestamp: new Date().getTime(),
      user: $scope.$storage.handle,
      avatar: $scope.$storage.avatar
		});
		$scope.modal.hide();
	}
  $ionicLoading.show({
      template: 'Loading...'
    });
  
  randomAvatar.getRandomUser().then(function(user){
    var host = $window.location.hostname;
    var protocol = $window.location.protocol
    
    $scope.$storage.avatar = user.avatar;
    $scope.$storage.handle = user.username;
    
    if(host.indexOf('mybluemix.net') > 0){
      getChatUrl(protocol + '//' + host);
    } else {
      MFPClientPromise.then( function (){
        MFPServices.getChatServiceInfo().then(getChatUrl);
        }
      );
    }

  });

  function getChatUrl(chatUrl){
      SocketIO.init(chatUrl);
      $scope.serverHost = chatUrl; 
      $ionicModal.fromTemplateUrl('templates/account.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
        $ionicLoading.hide();
        $scope.modal.show();
      });
  }
});
