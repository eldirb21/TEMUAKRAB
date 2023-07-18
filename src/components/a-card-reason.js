import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AText from './a-text';
import scannService from '../services/scannServices';
import ASpinner from './a-spinner';

export default function AcardReason({loading, children, data}) {
  const [datas, setdatas] = useState(data);
  const [loadingsubmit, setloadingsubmit] = useState(true);
  useEffect(() => {
    getCallback();
  }, []);
  const getCallback = () => {
    setloadingsubmit(true);
    scannService
      .loadId(data.id)
      .then(res => {
        setTimeout(() => setloadingsubmit(false), 1000);
        if (res.data) {
          setdatas(res.data);
        }
      })
      .catch(err => {
        setloadingsubmit(false);
      });
  };

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      // source={require('../assets/bg.png')}
    >
      {children}
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginBottom: '3%',
            justifyContent: 'center',
          }}>
          <AText
            style={{
              fontSize: 20,
              textTransform: 'uppercase',
              color: 'hsl(0, 0%, 90%)',
              textAlign: 'center',
              marginBottom: 20,
            }}>
            Temu Akrab
          </AText>
          <ActivityIndicator size={'large'} color="#FFF" />
        </View>
      ) : Object.keys(data).length != 0 ? (
        <View style={styles.context}>
          <AText style={styles.name}>{data.name}</AText>
          {data.tableNumbers && (
            <View style={styles.content}>
              <AText style={styles.label}>Table Numbers</AText>
              <AText style={styles.number}>{data.tableNumbers}</AText>
            </View>
          )}
          <View style={{flexDirection: 'row'}}>
            {data.pax && (
              <View style={[styles.content, styles.footer]}>
                <AText style={styles.label}>Pax</AText>
                <AText style={styles.number}>{data.pax}</AText>
              </View>
            )}
            {data.attendedPax != 0 &&
              data.attendedPax != null &&
              data.pax != null && <View style={{marginHorizontal: 20}} />}
            {data.attendedPax != 0 && data.attendedPax != null && (
              <View style={[styles.content, styles.footer]}>
                <AText style={styles.label}>Attended</AText>
                <AText style={styles.number}>{data.attendedPax}</AText>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginBottom: '15%',
            justifyContent: 'center',
          }}>
          <AText
            style={{
              fontSize: 20,
              textTransform: 'uppercase',
              color: '#1e81b0',
              textAlign: 'center',
            }}>
            Temu Akrab
          </AText>
        </View>
      )}
      <ASpinner visible={loadingsubmit} />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0.65,
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
    fontSize: 25,
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
  footer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.2)',
    borderRadius: 10,
    padding: 8,
    width: '35%',
  },
});
