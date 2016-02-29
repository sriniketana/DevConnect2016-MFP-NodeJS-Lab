angular.module('starter.services', []);

angular.module('starter.services')

.factory('MFPServices', function ($q) {

	return {
		'getChatServiceInfo': function () {
			var defer = $q.defer();
			getChatServiceInfo().then(
				function (response) {
					defer.resolve(response.responseJSON.chatUrl);
				}, function (response) {
					defer.reject(response);
				});
			return defer.promise;
		}
	};

	function getChatServiceInfo() {
		var adapterName = 'ChatService';
		var adapterProcedure = 'getChatServiceInfo';
		var adapterPath = '/adapters/' + adapterName + '/' + adapterProcedure;
		var resourceRequest = new WLResourceRequest(
			adapterPath,
			WLResourceRequest.GET);

		WL.Logger.debug("Adapter Carlled");
		return resourceRequest.send();
	}

});

angular.module('starter.services').factory('SocketIO', function ($rootScope, $timeout, $ionicScrollDelegate) {
  var socket;
  var posts = [];

  function addLocalPost(post) {
    $rootScope.$apply(function () {
      posts.push(post);
      scrollBottom();
    });
  }

  function scrollBottom() {
		  $timeout(function () { $ionicScrollDelegate.scrollBottom(true); }, 300);
  }

  function init(webSocketHost){
    socket = io(webSocketHost);
    socket.on('connect', function () {
      console.log('connected');
    });

    socket.on('new message', function (data) {
      addLocalPost(data.message)
    });
    
  }
  return {
    init: init,
    posts: posts,
    add: function (post) {
      posts.push(post);
      scrollBottom();
      socket.emit('new message', post);
    }
  };

});

angular.module('starter.services').factory('Camera', function ($ionicActionSheet, $cordovaCamera, $q) {
  function showSheet() {
    var deferred = $q.defer();
    $ionicActionSheet.show({
      buttons: [
        {
          text: 'Picture'
        }, {
          text: 'Selfie'
        }, {
          text: 'Photo Library'
        }
      ],
      cancelText: 'Cancel',
      buttonClicked: function (index) {
        ionic.Platform.isWebView() ? takeRealPicture(index, deferred) : takeFakePicture(deferred);
        return true;
      }
    });
    return deferred.promise;
  }

  function takeRealPicture(cameraIndex, deferred) {
    var options = {
      quality: 30,
      sourceType: cameraIndex === 2 ? 2 : 1,
      cameraDirection: cameraIndex,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 700,
      targetHeight: 600,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function (imageData) {
      var photo = "data:image/jpeg;base64," + imageData;
      deferred.resolve(photo);
    }, function (err) {
      takeFakePicture(deferred);
    });
  }

  function takeFakePicture(deferred) {
    deferred.resolve("img/bluemix-logo.png");
  }


  return {
    takePicture: showSheet
  }
});


angular.module('starter.services').factory('randomAvatar', function ($window, $http, $q) {
  var avatars = [
    'img/barrett.jpg',
    'img/slimer.jpg',
    'img/spengler.jpg',
    'img/stantz.jpg',
    'img/tully.jpg',
    'img/venkman.jpg',
    'img/winston.jpg'
  ];

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomUserLocal() {
    var defer = $q.defer();
    var user = {};
    var i = getRandomInt(0, avatars.length - 1);
    user.username = avatars[i];
    user.avatar = 'img/'+user.username+'.jpg';
    defer.resolve(user);
    return defer.promise;
  }
  
  function getRandomUser() {
    var defer = $q.defer();
    var user = {};
    $http.get('https://randomuser.me/api/').then(
      function win(resp){
        user.avatar = resp.data.results[0].user.picture.thumbnail;
        user.username = resp.data.results[0].user.name.first;
        defer.resolve(user);
      }, 
      function fail(resp){
        
      });
     return defer.promise; 
  }

  return {
    getRandomUserLocal: getRandomUserLocal,
    getRandomUser: getRandomUser
  };

});



