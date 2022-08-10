import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import AText from './a-text';

export default function AcardReason({
  companyName,
  companyNumber,
  loading,
  children,
  table,
}) {
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require('../assets/bg.png')}>
      {children}
      {loading ? (
        <ActivityIndicator size={'large'} color="#FFF" />
      ) : (
        companyName && (
          <View style={styles.context}>
            <AText style={styles.name}>{companyName}</AText>
            <View style={{flexDirection: 'row'}}>
              {companyNumber && (
                <View style={styles.content}>
                  <AText style={styles.label}>No Pax</AText>
                  <AText style={styles.number}>{companyNumber}</AText>
                </View>
              )}
              {table != null && companyNumber != null && (
                <View style={{marginHorizontal: 20}} />
              )}
              {table && (
                <View style={styles.content}>
                  <AText style={styles.label}>No Table</AText>
                  <AText style={styles.number}>{table}</AText>
                </View>
              )}
            </View>
          </View>
        )
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
    fontWeight: '600',
    textTransform: 'uppercase',
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
