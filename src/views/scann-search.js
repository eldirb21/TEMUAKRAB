import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Aicon from '../components/a-icon';
import AtextInput from '../components/a-textInput';
import scannService from '../services/scannServices';
import AText from '../components/a-text';
import ASpinner from '../components/a-spinner';

const {height, width} = Dimensions.get('window');
export default function ScannSearch(props) {
  const {visible, onClose, onData, onChanges} = props;
  const [Input, setInput] = useState('');
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingSearch, setloadingSearch] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [itemSelect, setitemSelect] = useState({});

  useEffect(() => {
    loadSearchKeywoard();
  }, [visible]);
  useEffect(() => {
    setitemSelect(onChanges);
  }, [onChanges]);
  useEffect(() => {
    const delay = setTimeout(() => {
      reload();
    }, 1000);
    return () => clearTimeout(delay);
  }, [Input]);
  const reload = () => {
    setloadingSearch(true);
    loadSearchKeywoard();
  };

  const loadSearchKeywoard = () => {
    setloading(true);
    scannService
      .searchKeyword(Input)
      .then(res => {
        setrefresh(false);
        setloading(false);
        setloadingSearch(false);
        setdata(res.data);
      })
      .catch(err => {
        setloading(false);
        setrefresh(false);
        setloadingSearch(false);
      });
  };
  const onSearchUser = value => {
    setInput(value);
  };

  const onPressLoad = value => {
    if (value != '') {
      setloadingSearch(true);
      const delay = setTimeout(() => reload(), 1000);
      return () => clearTimeout(delay);
    } else {
      ToastAndroid.showWithGravity(
        'Please, Enter User Search!',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };
  const onrefresh = () => {
    setrefresh(true);
    loadSearchKeywoard();
  };
  return (
    <Modal
      onRequestClose={onClose}
      animationType="fade"
      transparent
      visible={visible}>
      <TouchableOpacity onPress={onClose} style={styles.overley} />
      <View style={styles.container}>
        <ImageBackground
          style={{
            flex: 1,
            height: height,
            width: width,
          }}
          source={require('../assets/bg.png')}>
          <View style={styles.bg}>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              style={styles.close}>
              <Aicon name="arrow-back-ios" size={20} color="#FFF" />
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <AtextInput
                textColor="#FFF"
                onPress={() => onPressLoad(Input)}
                value={Input}
                onChangeText={val => onSearchUser(val)}
                margin={0.1}
                {...props}
              />
            </View>
          </View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View style={{borderBottomWidth: 1, borderColor: 'grey'}} />
            )}
            onRefresh={onrefresh}
            refreshing={refresh}
            ListEmptyComponent={() =>
              !loading &&
              !loadingSearch && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>No data Search</Text>
                </View>
              )
            }
            ListHeaderComponent={() => {
              if (!loadingSearch) return null;
              return (
                <View
                  style={{
                    height: 40,
                    width: '100%',
                    backgroundColor: '#00B8D4',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size={'small'} color="#FFF" />
                </View>
              );
            }}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.4}
                  style={[
                    styles.item,
                    itemSelect.id == item.id && {
                      backgroundColor: 'green',
                    },
                  ]}
                  onPress={() => {
                    setitemSelect(item);
                    onData(item);
                    onClose();
                  }}>
                  <AText style={styles.name}>{item.name}</AText>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <AText style={{color: '#FFF'}}>Pax : </AText>
                    <Text
                      style={{minWidth: 25, textAlign: 'right', color: '#FFF'}}>
                      {item.pax}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </ImageBackground>
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
    backgroundColor: 'rgba(0,0,0,0.2)',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  name: {
    fontSize: 18,
    textTransform: 'capitalize',
    color: '#FFF',
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
