import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import AText from './a-text';

export default function AformHead({Items}) {
  var itemWaiting = Items.pax - Items.attendedPax;
  return (
    <View style={styles.container}>
      <AText style={styles.text_head}>{Items.name}</AText>
      <View style={{flexDirection: 'row'}}>
        <View>
          <AText style={[{color: 'grey'}, {marginBottom: 10}]}>
            Nomor Meja
          </AText>
          <AText style={{color: 'grey'}}>Jumlah Anggota</AText>
          <AText style={{color: 'grey'}}>Jumlah Confirmasi</AText>
          <AText style={{color: 'red', marginTop: 5}}>Belum Confirmasi</AText>
        </View>
        <View>
          <AText
            style={[
              {color: 'grey'},
              {marginBottom: 10},
            ]}>{`   : ${Items.tableNumbers}`}</AText>
          <AText style={{color: 'grey'}}>{`   : ${Items.pax}`}</AText>
          <AText
            style={{
              color: 'grey',
            }}>{`   : ${Items.attendedPax}`}</AText>
          <AText
            style={{
              color: 'red',
              marginTop: 5,
            }}>{`   : ${itemWaiting}`}</AText>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  text_head: {
    color: 'green',
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: '700',
    // fontWeight: 'bold',
  },
});
