# IBM InterConnect 2016 Hello World Labs
# Mobile App Development Using the IBM MobileFirst Platform Foundation Command Line Interface (MFP-CLI)

## 1. Bluemix NodeJS Server

Login into https://blueminx.net and verify that you have at least 128MB free for Cloud Foundry Apps

Deploy the NodeJS Server for the Chat Service

Click this button [![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/csantanapr/IC2016-MFP-Hello-Lab&branch=nodejs)

Or Visit [https://bluemix.net/deploy?repository=https://github.com/csantanapr/IC2016-MFP-Hello-Lab&branch=nodejs](https://bluemix.net/deploy?repository=https://github.com/csantanapr/IC2016-MFP-Hello-Lab&branch=nodejs)

Select a unique hostname for your new App

Save the url for your new Chat Service (i.e. https://mychat.bluemix.net)

## 2. MFP Server

### Start MFP Server

Change directory to MFP backend project

    $ cd MFPBackend
    
Use the MFP-CLI to start the MFP Server

    $ mfp start
    
You can use other MFP-CLI commands to manage the MFP Server

    $ mfp status
    $ mfp stop
    $ mfp restart

### Configure the MFP Adapter
Edit `MFPBackend/adapters/ChatService/ChatService-impl.js`

Set the variable chatUrl to the url of your new Chat Service deployed in Step 1

    var chatUrl = 'https://mychat.mybluemix.net';

### Deploy Adapter changes

Change directory to the adapter directory

    $ cd MFPBackend/adapters/ChatService/

Use the MFP-CLI to push only the adapter changes

    $ mfp push

Use the MFP-CLI to open the console and verify adapter is deployed

    $ mfp console

## 3. MFP App

Change directory to the app directory

    $ cd MFPApp
    
Use the MFP-CLI to push the app to the running MFP Server

    $ mfp push

Run the App on the Simulator using the MFP-CLI

    $ mfp cordova emulate
    
To run a specific Simulator you can pass `--target` argument

    $ mfp cordova emulate --target iPhone-6s-Plus  


Visit the Chat Service on the Browser (i.e. https://mychat.bluemix.net)

Now test the chat service between the Browser and the iPhone Simulator


## 4. Extra Credit

If you finish the Lab in less than 15 minutes you can go ahead and continue

Enable the App to send photos using the camera or photo library

### Open XCode project

Open `MFPApp/platforms/ios/IC2016Chat.xcodeproj`

You can also open from Terminal

    $ open platforms/ios/*.xcodeproj

Click Play Button in XCode to run Simulator

### Add the Cordova Camera Plugin

Change directory to App

    $ cd MFPApp

Use the MFP-CLI to add the camera plugin

    $ mfp cordova plugin add camera

### Add option to share photo

Edit `MFPApp/www/templates/chat.html`

Add a camera icon to call Camera Plugin as the first child of the `<form>`

    <i class="icon ion-camera" ng-click="takePicture()" ng-show="isWebView"></i>
   
### Deploy App Changes

Use the MFP-CLI to deploy your changes


    $ mfp cordova prepare

Click Play Button in XCode to run Simulator

Touch the Camera button 

Select Photo Library (Real device supports Selfie and Picture buttons)

Select a Photo to share
 


