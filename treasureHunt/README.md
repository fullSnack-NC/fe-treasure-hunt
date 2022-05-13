# Park Life

## Link To Hosted Version

<<<<<ADD HERE>>>>>

## Overview

This is a fun and interactive app aimed at young families who are keen to get into the outdoors and embrase nature around them. The app is focused around a map interface, that plots coordinates based on images of landmarks. The family then 'Hunt' for these landmarks in their area, and can follow their own path on the map and see their live location in comparision to the landmark coordinates.

Upon arriving at a desitination, the user can collect an acorn. The aim is to collect all the acorns, to recive a park explorer certificate!

The app will identify if the user is closer or futher from the landmark, by alerting 'Hot' or 'Cold' using colour and fun messages to relay this. The user can see their distance from the landmark in metres at any point.

This is a final project piece at the end of a 13 week intensive coding bootcamp at NorthCoders.

## Link to video

## Dependencies

Expo go has been used to allow this app to run on simulators for both iOS (Xcode) and android (Android Studio). Please ensure you have expo installed globally. https://docs.expo.dev/get-started/installation/

This repo also uses a google API connection, to allow us to link to google maps API. Please sign up for access, you can follow the following instructions. https://docs.expo.dev/versions/latest/sdk/map-view/

### Suggested minimum version

Node 16.14
React 17.0.1
React Native 0.64.3
Expo 5.4.0

## To run locally

Please git clone this repo, then ensure you are in the correct file in your terminal command line by using cd/ls

### `npm install`

This will ensure all the correct dependencies are copied onto your machine.

### .env file

Please create enviroment variables to be able to clone and locally run this file succesfully. Please create the following file and double check it is succesfully in .gitignore:

- `.env` - In the body of this file please add REACT_APP_MAPS_API_KEY=‘YourKey’

### `expo start`

This will launch a local version of the app through expo, we suggest selecting i for iOS or a for Android.

## BE repo

https://be-treasure-hunt.herokuapp.com/api
