# Vakanties, A React Native project to display holidays from API

<div style={ display: flex } >
  <img src="https://i.imgur.com/2ow3vCl.jpeg" width="25%">
  <img src="https://i.imgur.com/BsXHefR.jpeg" width="23.62%">
</div>

## Creating a Google Maps API Key
- Access [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials) and create one. Google may ask for a credit card, but you won't have to pay anything. If you encounter difficulties at this step, feel free to ask for help!
- For a school project, you can select 'no restriction' for the API key. You can also configure it for Android/iOS if you prefer, but it's more complex.

## Creating a Build
- To create a build, you need to configure the Expo credentials. If you don't have an Expo account, create one. Create an Expo project at [https://expo.dev/accounts/yourusername/projects](https://expo.dev/accounts/yourusername/projects).

In the project folder, execute these commands:
- npm i -g eas-cli
- eas login
- eas init --id your-project-code [you can find it in your Expo projects]

## Creating an Android Executable
- Run eas build:configure
- Run eas credentials > Android > Set up a new keystore
- Now, edit your Google Maps API key and include your SHA-1 code and Android package.

Building the APK
(Needs configuration of EAS before building.)

Run on terminal:
- eas build > Android

## Creating an IOS Executable
You'll need an Apple Developer Account to do this...
