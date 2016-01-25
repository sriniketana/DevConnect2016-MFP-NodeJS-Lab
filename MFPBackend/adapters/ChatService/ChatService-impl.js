

function getChatServiceInfo(){
  
  //Setup a SocketIO NodeJS Server on Bluemix
  //Do Deploy visit this url: https://bluemix.net/deploy?repository=https://github.com/csantanapr/ionic-chat
  var chatUrl = 'https://chatservice.mybluemix.net';
  
  return {'chatUrl':chatUrl};

}