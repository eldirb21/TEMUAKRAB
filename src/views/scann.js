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
  const [ShowList, setShowList] = useState(false);
  const [Inputan, setInputan] = useState('');
  const [canDetectBarcode, setcanDetectBarcode] = useState(false);
  const [flash, setflash] = useState('off');
  const [autoFocus, setautoFocus] = useState('on');
  const [textBlocks, settextBlocks] = useState([]);
  const [barcods, setbarcodes] = useState([]);
  const [data, setdata] = useState({});
  const [autoFocusPoint, setautoFocusPoint] = useState({
    normalized: {x: 0.5, y: 0.5},
    drawRectPosition: {
      x: Dimensions.get('window').width * 0.5 - 32,
      y: Dimensions.get('window').height * 0.5 - 32,
    },
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      setcanDetectBarcode(true);
    }, 2500);
    return () => clearTimeout(delay);
  }, [canDetectBarcode]);

  const loadbyId = () => {
    console.log('press');
    scannService
      .loadId(Inputan)
      .then(res => {
        // console.log('res = ', res.data);
        setdata(res.data);
      })
      .catch(err => {
        // console.log('err = ', err);
      });
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
    // console.log('press');
    if (barcodes.length != 0) {
      var x = barcods.map(x => x.data);
      var y = barcodes.map(x => x.data);
      if (JSON.stringify(x) == JSON.stringify(y)) {
        ToastAndroid.showWithGravity(
          'Scann barcode already exists!',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50,
        );
        console.log(Object.keys(data).length == 0);
        Object.keys(data).length == 0 && loadbyId();
      } else {
        setbarcodes(barcodes);
        loadbyId();
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
          styles.text,
          {...bounds.size, left: bounds.origin.x, top: bounds.origin.y},
        ]}>
        <AText style={[styles.textBlock]}>{data}</AText>
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

      <AcardReason companyName={data.name} companyNumber={data.pax}>
        <AtextInput
          showSoftInputOnFocus={false}
          onPress={() => setShowList(true)}
          onTouchStart={val => setShowList(true)}
          value={Inputan}
        />
      </AcardReason>

      <ScannSearch
        onClose={() => setShowList(!ShowList)}
        onData={data => setdata(data)}
        visible={ShowList}
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
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFF',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#FFF',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
