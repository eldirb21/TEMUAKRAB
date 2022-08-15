import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AText from './a-text';
import scannService from '../services/scannServices';
import ASpinner from './a-spinner';
import AformHead from './a-form-head';

export default function AmodalInput({
  Items,
  onChange,
  visible,
  onHidden,
  ...res
}) {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);

  const [Inputs, setInputs] = useState({
    Id: '',
    Pax: '',
  });
  const onSubmited = () => {
    if (Inputs.Pax != '' && Inputs.Pax != 0) {
      var newInput = Inputs;
      newInput.Id = Items.id;
      newInput.Pax = parseInt(newInput.Pax);
      setloading(true);
      scannService
        .updateParticipants(Inputs)
        .then(res => {
          onChange(res.data);
          setloading(false);
          onCloses();
        })
        .catch(err => {
          setloading(false);
        });
    } else {
      ToastAndroid.showWithGravity(
        'Please, Input Jumlah  Kedatangan!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        20,
        20,
      );
    }
  };
  const onCloses = () => {
    onHidden();
    setInputs({
      ...Inputs,
      Id: '',
      Pax: '',
    });
  };
  if (!visible) return null;

  return (
    <Modal transparent visible={visible} onRequestClose={() => onCloses()}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={{flex: 1, marginBottom: 20}}>
            <AformHead Items={Items} />
            <View style={styles.container_input}>
              <AText style={{color: 'grey'}}>Jumlah Kedatangan</AText>
              <TextInput
                style={styles.textInput}
                placeholder="Kedatangan"
                placeholderTextColor={'grey'}
                keyboardType="numeric"
                value={
                  typeof Inputs.Pax == 'number'
                    ? Inputs.Pax.toString()
                    : Inputs.Pax
                }
                onChangeText={val => setInputs({...Inputs, Pax: val})}
                {...res}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.btn_cancel}
              onPress={() => onCloses()}>
              <AText style={{color: 'green'}}>Cancel</AText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_submit} onPress={onSubmited}>
              <AText style={{color: '#FFF'}}>Save</AText>
            </TouchableOpacity>
          </View>
        </View>
        <ASpinner visible={loading} />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    padding: 30,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
    minHeight: '55%',
    padding: 20,
    bottom: 0,
    left: 0,
    right: 0,
  },
  head: {
    alignItems: 'center',
    marginBottom: 20,
  },

  container_input: {
    height: 45,
    // flex: 1,
    // ,
  },
  textInput: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderColor: 'grey',
    color: '#000',
    marginTop: 3,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn_cancel: {
    padding: 8,
    width: '45%',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'green',
  },
  btn_submit: {
    padding: 8,
    width: '45%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'green',
  },
});
