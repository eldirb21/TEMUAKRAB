import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AText from './a-text';

export default function AcardReason({companyName, companyNumber, children}) {
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require('../assets/bg.png')}>
      {children}

      {companyName && (
        <View style={styles.context}>
          <AText style={styles.name}>{companyName}</AText>
          <View style={styles.content}>
            <AText style={styles.label}>No Bangku</AText>
            <AText style={styles.number}>{companyNumber}</AText>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0.55,
    paddingTop: 10,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  context: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    marginTop: 20,
    alignItems: 'center',
  },
  label: {
    color: '#000',
    fontSize: 16,
  },
  number: {
    fontWeight: '600',
    fontSize: 45,
    color: 'green',
  },
  btn_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn_scann: {
    flex: 0.5,
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    marginLeft: 20,
  },
});
