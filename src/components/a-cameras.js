import {View, Text} from 'react-native';
import React from 'react';
import {RNCamera} from 'react-native-camera';
const Acameras = React.forwardRef((props, ref) => {
  return (
    <RNCamera
      ref={ref}
      style={{flex: 1}}
      type={'back'}
      ratio={'16:9'}
      whiteBalance={'auto'}
      focusDepth={0}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      faceDetectionLandmarks={
        RNCamera.Constants.FaceDetection.Landmarks
          ? RNCamera.Constants.FaceDetection.Landmarks.all
          : undefined
      }
      {...props}>
      {props.children}
    </RNCamera>
  );
});

export default Acameras;
