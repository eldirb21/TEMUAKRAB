import React, {useContext} from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  StatusBar,
  View,
} from 'react-native';

export default function ASpinner(props) {
  const {visibleposition, visible} = props;
  return (
    <>
      {visibleposition == true && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          {Platform.OS === 'android' ? (
            <StatusBar
              hidden={visibleposition}
              backgroundColor="rgba(0,0,0,0.3)"
            />
          ) : null}
          <ActivityIndicator size={45} color={'blue'} />
        </View>
      )}
      {visible && (
        <Modal transparent visible={visible} statusBarTranslucent={visible}>
          {Platform.OS === 'android' ? (
            <StatusBar
              hidden={visible}
              translucent={visible}
              showHideTransition="slide"
              animated={visible}
              networkActivityIndicatorVisible={visible}
              backgroundColor="rgba(0,0,0,0.3)"
            />
          ) : null}
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}>
            <ActivityIndicator size={45} color={'blue'} />
          </View>
        </Modal>
      )}
    </>
  );
}
