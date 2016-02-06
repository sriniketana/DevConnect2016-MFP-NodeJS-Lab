# IBM InterConnect 2016 @Dev Hello World Labs
# 6678 - Mobile App Development Using the IBM MobileFirst Platform Foundation Command Line Interface (MFP-CLI)

## Download
Click **Download ZIP** above or click [here](https://github.com/csantanapr/IC2016-MFP-Hello-Lab/archive/master.zip)

### During this Lab you will build a Mobile Chat App that leverages the MFP Server and NodeJS using IBM Bluemix.

![iphone chat app](/README-img/iphone.png)

## 1. Bluemix NodeJS Server

Login into https://blueminx.net and verify that you have at least 128MB free for Cloud Foundry Apps

### 1.1 Deploy the NodeJS Server for the Chat Service

Click this button <a href="https://bluemix.net/deploy?repository=https://github.com/csantanapr/IC2016-MFP-Hello-Lab&amp;branch=nodejs" target="_blank">
<img src="https://bluemix.net/deploy/button.png" alt="Deploy to Bluemix" style="max-width:100%;">
</a>or visit <a href="http://ibm.biz/lab6678" target="_blank">http://ibm.biz/lab6678</a>

This will deploy the **nodejs** branch

Select a unique hostname for your new App

![bluexmix app deployed](/README-img/bluemix-deploy.png)

### 1.2 Save the url for your new Chat Service (i.e. https://mychat.bluemix.net)

## 2. MFP Server

### 2.1 Start MFP Server

2.1.1 Change directory to MFP backend project

    $ cd MFPBackend
    
2.1.2 Use the MFP-CLI to start the MFP Server

    $ mfp start
    
2.1.3 You can use other MFP-CLI commands to manage the MFP Server

    $ mfp status
    $ mfp stop
    $ mfp restart

### 2.2 Configure the MFP Adapter
2.2.1 Edit `MFPBackend/adapters/ChatService/ChatService-impl.js`

Set the variable chatUrl to the url of your new Chat Service deployed in Step 1

    var chatUrl = 'https://mychat.mybluemix.net';

### 2.3  Deploy Adapter changes

2.3.1 Change directory to the adapter directory

    $ cd MFPBackend/adapters/ChatService/

2.3.2 Use the MFP-CLI to push only the adapter changes

    $ mfp push

2.3.3 Use the MFP-CLI to open the console and verify adapter is deployed

    $ mfp console

![adapter deployed on console](/README-img/console-adapter.png)
    
2.3.4 Test the adapter and verify that returns the correct chat url

    $ mfp adapter call ChatService/getChatServiceInfo

    Calling GET '/MFPBackend/adapters/ChatService/getChatServiceInfo?params=[]'

    Response:
    {
      "isSuccessful": true,
      "chatUrl": "https://chatservice.mybluemix.net"
    }

## 3. MFP App

### 3.1 Setup App
3.1.1 Change directory to the app directory

    $ cd MFPApp

3.1.2 Use the MFP-CLI to add the Cordova Platform iOS

    $ mfp cordova platform add ios

### 3.2 Register App with MFP Server
3.2.1 Use the MFP-CLI to push the app to the running MFP Server

    $ mfp push

3.2.2 Open Console and verify that App is registered

![app deployed on console](/README-img/console-app.png)

### 3.3 Running the App
3.3.1 Preview the App on the Browser

    $ mfp cordova preview --type browser

3.3.2 Run the App on the Simulator using the MFP-CLI

    $ mfp cordova emulate
    
3.3.3 To run a specific Simulator you can pass `--target` argument

    $ mfp cordova emulate --target iPhone-6s-Plus  


### 3.4 Test the App

3.4.1 Visit the Chat Service on the Browser (i.e. https://mychat.bluemix.net)

Now test the chat service between the Browser and the iPhone Simulator


## 4. Extra Credit (Access Camera)

If you finish the Lab in less than 15 minutes you can go ahead and continue

Enable the App to send photos using the camera or photo library

![iphone chat app with photo options](/README-img/iphone-extra.png)

### 4.1 Open XCode project

Open `MFPApp/platforms/ios/IC2016Chat.xcodeproj`

You can also open from Terminal

    $ open platforms/ios/*.xcodeproj

Click Play Button in XCode to run Simulator

![app open in xcode](/README-img/xcode.png)

### 4.2 Add the Cordova Camera Plugin

Change directory to App

    $ cd MFPApp

Use the MFP-CLI to add the camera plugin

    $ mfp cordova plugin add camera

### 4.3 Add option to share photo

Edit `MFPApp/www/templates/chat.html`

Add a camera icon to call Camera Plugin as the first child of the `<form>`

    <i class="icon ion-camera" ng-click="takePicture()" ng-show="isWebView"></i>
   
### 4.4 Deploy App Changes

Use the MFP-CLI to deploy your changes


    $ mfp cordova prepare

Click Play Button in XCode to run Simulator

Touch the Camera button 

Select Photo Library (Real device supports Selfie and Picture buttons)

Select a Photo to share

Check the other clients and see the picture you just share 


