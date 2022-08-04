import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Aicon from '../components/a-icon';
import AtextInput from '../components/a-textInput';
import scannService from '../services/scannServices';
import AText from '../components/a-text';

export default function ScannSearch(props) {
  const {visible, onClose, onData} = props;
  const [Input, setInput] = useState('');
  const [data, setdata] = useState({
    name: 'PT.SAMPLE ABCD',
    pax: 24,
  });
  const [loading, setloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      if (Input != '') load();
    }, 1000);
    return () => clearTimeout(delay);
  }, [Input]);

  const load = () => {
    setloading(true);
    scannService
      .loadName(Input)
      .then(res => {
        setTimeout(() => {
          setdata(res.data);
          setloading(false);
        }, 2000);
      })
      .catch(err => {
        setTimeout(() => {
          setloading(false);
        }, 2000);
      });
  };

  const onPressLoad = () => {
    if (Input != '') {
      onClose();
      load();
    } else {
      ToastAndroid.showWithGravity(
        'Please, Input User Name!',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };
  return (
    <Modal
      onRequestClose={onClose}
      animationType="fade"
      transparent
      visible={visible}>
      <TouchableOpacity onPress={onClose} style={styles.overley} />
      <View style={styles.container}>
        <View style={styles.bg}>
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.7}
            style={styles.close}>
            <Aicon name="arrow-back-ios" size={20} color="#000" />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <AtextInput
              onPress={onPressLoad}
              value={Input}
              onChangeText={val => setInput(val)}
              margin={0.1}
              {...props}
            />
          </View>
        </View>
        {loading ? (
          <View style={{marginTop: 20}}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : Object.keys(data).length != 0 ? (
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.item}
            onPress={() => {
              onData(data);
              onClose();
            }}>
            <AText style={styles.name}>{data.name}</AText>
            <AText style={{fontSize: 18}}>{data.pax}</AText>
          </TouchableOpacity>
        ) : (
          <View style={styles.emptycontent}>
            <AText style={styles.textEmpty}>Search User Data</AText>
          </View>
        )}
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overley: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
  },
  bg: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.3)',
  },
  close: {
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  item: {
    padding: 14,
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: 'grey',
    marginHorizontal: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
  emptycontent: {
    alignItems: 'center',
    marginTop: 20,
  },
  textEmpty: {
    color: 'grey',
    fontSize: 18,
  },
});
