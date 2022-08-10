import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import Aicon from './a-icon';
import AText from './a-text';

export default function AcameraHead({
  onClose,
  toggleFlash,
  touchToFocus,
  drawFocusRingPosition,
  toggle,
  flash,
}) {
  return (
    <>
      <View style={[StyleSheet.absoluteFill]}>
        <View style={[styles.autoFocusBox, drawFocusRingPosition]} />
        <TouchableWithoutFeedback onPress={touchToFocus}>
          <View style={{flex: 1}} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose}>
          <Aicon type="Ionicons" size={25} name="close" color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggle} style={styles.flipButton}>
          <AText style={styles.flipText}>{'Scann QR Code'}</AText>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFlash}>
          <Aicon
            color="#FFF"
            size={25}
            type="MaterialCommunityIcons"
            name={
              (flash == 'off' && 'flash-off') ||
              (flash == 'on' && 'flash-outline') ||
              (flash == 'auto' && 'flash-auto') ||
              (flash == 'torch' && 'flash-alert-outline')
            }
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flipButton: {
    // flex: 0.3,
    // height: 40,
    // marginHorizontal: 2,
    // marginBottom: 10,
    // marginTop: 10,
    // borderRadius: 8,
    // borderColor: 'white',
    // borderWidth: 1,
    // padding: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  autoFocusBox: {
    // backgroundColor:'red',
    position: 'absolute',
    height: 150,
    width: 150,
    borderRadius: 12,
    // borderWidth: 2,
    // borderColor: 'white',
    opacity: 0.4,
  },
  flipText: {
    color: 'white',
    fontSize: 16,
  },
});
