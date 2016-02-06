

function getChatServiceInfo(){
  
  //Setup a SocketIO NodeJS Server on Bluemix first
  //To Deploy visit this url: http://ibm.biz/lab6678
  var chatUrl = 'https://chatservice.mybluemix.net';
  
  return {'chatUrl':chatUrl};

}