import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {createRef, useEffect, useRef, useState} from 'react';
import {RNCamera} from 'react-native-camera';
import Slider from '@react-native-community/slider';
import AtextInput from '../components/a-textInput';
import AcardReason from '../components/a-card-reason';
import Acameras from '../components/a-cameras';
import Aicon from '../components/a-icon';
import AcameraHead from '../components/a-camera-head';
import ScannSearch from './scann-search';
import scannService from '../services/scannServices';
import AText from '../components/a-text';
import AmodalInput from '../components/a-modal-input';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

const landmarkSize = 2;

export default function Scann() {
  const camera = createRef();
  const [ShowForm, setShowForm] = useState(false);
  const [ShowList, setShowList] = useState(false);
  const [Inputan, setInputan] = useState('');
  const [canDetectBarcode, setcanDetectBarcode] = useState(false);
  const [flash, setflash] = useState('off');
  const [autoFocus, setautoFocus] = useState(RNCamera.Constants.AutoFocus.on); //('on');
  const [textBlocks, settextBlocks] = useState([]);
  const [barcods, setbarcodes] = useState([]);
  const [data, setdata] = useState({
    name: 'Jhon due',
    pax: 10,
    tableNumbers: 5,
    attendedPax: 3,
  });
  const [loading, setloading] = useState(false);
  const [autoFocusPoint, setautoFocusPoint] = useState({
    normalized: {x: 0.5, y: 0.5},
    drawRectPosition: {
      x: Dimensions.get('window').width * 0.5 - 32,
      y: Dimensions.get('window').height * 0.5 - 32,
    },
  });

  useEffect(() => {
    const delay = setTimeout(() => setcanDetectBarcode(true), 2500);
    return () => clearTimeout(delay);
  }, [canDetectBarcode]);

  const loadbyId = barcodes => {
    var brcd = '';
    if (barcodes.length != 0) {
      brcd = barcodes.map(x => x.data).toString();
    }
    if (brcd != '') {
      setloading(true);
      scannService
        .loadId(brcd)
        .then(res => {
          setTimeout(() => setloading(false), 1000);
          setdata(res.data);
          setShowForm(true);
          if (res.data == '') {
            ToastAndroid.show('Data tidak ditemukan!', ToastAndroid.SHORT);
          }
        })
        .catch(err => {
          setloading(false);
        });
    }
  };

  function toggleFlash() {
    setflash(flashModeOrder[flash]);
  }

  function touchToFocus(event) {
    setcanDetectBarcode(true);
    const {pageX, pageY} = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const isPortrait = screenHeight > screenWidth;

    let x = pageX / screenWidth;
    let y = pageY / screenHeight;
    if (isPortrait) {
      x = pageY / screenHeight;
      y = -(pageX / screenWidth) + 1;
    }
    setautoFocusPoint({
      ...autoFocusPoint,
      normalized: {x, y},
      drawRectPosition: {x: pageX, y: pageY},
    });
  }

  const barcodeRecognized = ({barcodes}) => {
    if (barcodes.length != 0) {
      var x = barcods.map(x => x.data);
      var y = barcodes.map(x => x.data);
      if (JSON.stringify(x) == JSON.stringify(y)) {
        ToastAndroid.showWithGravity(
          'Scann barcode already exists!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        setbarcodes(barcodes);
        loadbyId(barcodes);
      } else {
        setbarcodes(barcodes);
        loadbyId(barcodes);
      }
    }
    setcanDetectBarcode(!canDetectBarcode);
  };

  const renderBarcodes = () => (
    <View pointerEvents="none">{barcods.map(renderBarcode)}</View>
  );
  const renderBarcode = ({bounds, data, type}) => (
    <React.Fragment key={data + bounds.origin.x}>
      <View
        style={[
          styles.Fragment,
          {...bounds.size, left: bounds.origin.x, top: bounds.origin.y},
        ]}>
        <View style={styles.ItemFragment}>
          <View style={[styles.equels, styles.top, styles.left]} />
          <View style={[styles.equels, styles.bottom, styles.left]} />
        </View>
        <View style={styles.ItemFragment}>
          <View style={[styles.equels, styles.top, styles.right]} />
          <View style={[styles.equels, styles.bottom, styles.right]} />
        </View>
      </View>
    </React.Fragment>
  );

  const drawFocusRingPosition = {
    top: autoFocusPoint.drawRectPosition.y - 32,
    left: autoFocusPoint.drawRectPosition.x - 32,
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Acameras
          ref={camera}
          flashMode={flash}
          autoFocus={autoFocus}
          autoFocusPointOfInterest={autoFocusPoint.normalized}
          onGoogleVisionBarcodesDetected={
            canDetectBarcode ? barcodeRecognized : null
          }>
          <AcameraHead
            onClose={() => {
              setbarcodes([]);
              setcanDetectBarcode(!canDetectBarcode);
            }}
            drawFocusRingPosition={drawFocusRingPosition}
            canDetectBarcode={canDetectBarcode}
            touchToFocus={touchToFocus}
            toggleFlash={toggleFlash}
            flash={flash}
          />
          {renderBarcodes()}
        </Acameras>
      </View>

      <AcardReason data={data} loading={loading}>
        <AtextInput
          containerStyle={{textTransform: 'capitalize'}}
          showSoftInputOnFocus={false}
          onPress={() => setShowList(true)}
          onTouchStart={val => setShowList(true)}
          value={data.name}
        />
      </AcardReason>
      <ScannSearch
        onClose={() => {
          setShowList(!ShowList);
          setShowForm(true);
        }}
        onData={data => setdata(data)}
        onChanges={data}
        visible={ShowList}
      />

      <AmodalInput
        Items={data}
        onChange={val => setdata(val)}
        visible={ShowForm && Object.keys(data).length != 0}
        onHidden={() => setShowForm(!ShowForm)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  Fragment: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
  },
  ItemFragment: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  equels: {
    borderRadius: 5,
    alignSelf: 'center',
    height: 20,
    width: 20,
  },
  bottom: {
    borderBottomColor: '#D2D2D2',
    borderBottomWidth: 2,
  },
  top: {
    borderTopColor: '#D2D2D2',
    borderTopWidth: 2,
  },
  right: {
    borderRightColor: '#D2D2D2',
    borderRightWidth: 2,
  },
  left: {
    borderLeftColor: '#D2D2D2',
    borderLeftWidth: 2,
  },
});
