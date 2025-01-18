![Kyber Vision Mobile Logo](./assets/images/kyberVisionLogo01.png)

#### v 0.7.0

## Description

- works with API06
- Make the Top navigation bar smaller
- design a new Portrait mode scripting with new design - must have space to tap.
- This version will ask for onboarding number of players to script
- portrait mode will have a space to tap the screen to indicate player whose action is being scripted.
  - implement gesture GestureScreen06 with ActionWheel02 from this repo: https://github.com/costa-rica/NativeStuff17nonRectanglularButtons
- probably needs local database?

## Installations

### Navigation

1. install

```
   yarn add @react-navigation/native @react-navigation/native-stack
   npx expo install react-native-screens react-native-safe-area-context
```

### Reducers

1. install
   `yarn add react-redux @reduxjs/toolkit`

### Play video

1. install
   `npx expo install expo-video`
2. video disable native controls: `nativeControls={false}`

### sense re orienting of screen for video

1. terminal: `npx expo install expo-screen-orientation`
2. app.json: make sure the orientation is set to "default" otherwise it won't adjust.

```json
{
  "expo": {
    "orientation": "default" // <---- important
  }
}
```

## Gesture handling

1. install: `npx expo install react-native-gesture-handler`

## Orientation Descriptions

- o.orientationInfo.orientation

1, portriat, upright
2, portrati, upsidedown
3, landscape, right

- using the right buttons on emulator, from portrait upright, click the bottom button w/ circular arrow pointing right
  4, landscape, left

## Video playback

To use the timeUpdate listener it is important to set the `timeUpdateEventInterval`.

```js
const player = useVideoPlayer(videoSource, (player) => {
  player.loop = true;
  player.play();
  player.timeUpdateEventInterval = 1; //< --- this is what you're missing
});
```
