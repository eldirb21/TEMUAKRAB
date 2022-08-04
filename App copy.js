// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//  } from 'react-native';
// import React, {createRef, useRef, useState} from 'react';
// import {RNCamera} from 'react-native-camera';
// import Slider from '@react-native-community/slider'

// const flashModeOrder = {
//   off: 'on',
//   on: 'auto',
//   auto: 'torch',
//   torch: 'off',
// };

// const wbOrder = {
//   auto: 'sunny',
//   sunny: 'cloudy',
//   cloudy: 'shadow',
//   shadow: 'fluorescent',
//   fluorescent: 'incandescent',
//   incandescent: 'auto',
// };

// const landmarkSize = 2;

// export default function App() {
//   const camera = createRef(null);
//   const [canDetectFaces, setcanDetectFaces] = useState(false);
//   const [canDetectText, setcanDetectText] = useState(false);
//   const [canDetectBarcode, setcanDetectBarcode] = useState(false);
//   const [flash, setflash] = useState('off');
//   const [zoom, setzoom] = useState(0);
//   const [autoFocus, setautoFocus] = useState('on');
//   const [autoFocusPoint, setautoFocusPoint] = useState({
//     normalized: {x: 0.5, y: 0.5},
//     drawRectPosition: {
//       x: Dimensions.get('window').width * 0.5 - 32,
//       y: Dimensions.get('window').height * 0.5 - 32,
//     },
//   });
//   const [recordOptions, setrecordOptions] = useState({
//     mute: false,
//     maxDuration: 5,
//     quality: RNCamera.Constants.VideoQuality['288p'],
//   });
//   const [depth, setdepth] = useState(0);
//   const [type, settype] = useState('back');
//   const [whiteBalance, setwhiteBalance] = useState('auto');
//   const [ratio, setratio] = useState('16:9');
//   const [isRecording, setisRecording] = useState(false);
//   const [faces, setfaces] = useState([]);
//   const [textBlocks, settextBlocks] = useState([]);
//   const [barcodes, setbarcodes] = useState([]);

//   const drawFocusRingPosition = {
//     top: autoFocusPoint.drawRectPosition.y - 32,
//     left: autoFocusPoint.drawRectPosition.x - 32,
//   };

//   function toggleFacing() {
//     settype(type === 'back' ? 'front' : 'back');
//   }

//   function toggleFlash() {
//     setflash(flashModeOrder[flash]);
//   }

//   function toggleWB() {
//     setwhiteBalance(wbOrder[whiteBalance]);
//   }

//   function toggleFocus() {
//     setautoFocus(autoFocus === 'on' ? 'off' : 'on');
//   }

//   function touchToFocus(event) {
//     const {pageX, pageY} = event.nativeEvent;
//     const screenWidth = Dimensions.get('window').width;
//     const screenHeight = Dimensions.get('window').height;
//     const isPortrait = screenHeight > screenWidth;

//     let x = pageX / screenWidth;
//     let y = pageY / screenHeight;
//     // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
//     if (isPortrait) {
//       x = pageY / screenHeight;
//       y = -(pageX / screenWidth) + 1;
//     }

//     setautoFocusPoint({
//       autoFocusPoint: {
//         normalized: {x, y},
//         drawRectPosition: {x: pageX, y: pageY},
//       },
//     });
//   }

//   function zoomOut() {
//     setzoom(zoom - 0.1 < 0 ? 0 : zoom - 0.1);
//   }

//   function zoomIn() {
//     setzoom(zoom + 0.1 > 1 ? 1 : zoom + 0.1);
//   }

//   function setFocusDepth(depth) {
//     setdepth(depth);
//   }

//   async function takePicture() {
//     if (camera) {
//       const data = await camera.takePictureAsync();
//       console.warn('takePicture ', data);
//     }
//   }

//   async function takeVideo() {
//     if (camera && !isRecording) {
//       try {
//         const promise = camera.recordAsync(recordOptions);

//         if (promise) {
//           setisRecording(true);
//           const data = await promise;
//           console.warn('takeVideo', data);
//         }
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   }

//   const toggle = value => () => {
//     // this.setState(prevState => ({[value]: !prevState[value]}));
//   };

//   const facesDetected = ({faces}) => setfaces(faces);

//   const renderFace = ({bounds, faceID, rollAngle, yawAngle}) => (
//     <View
//       key={faceID}
//       transform={[
//         {perspective: 600},
//         {rotateZ: `${rollAngle.toFixed(0)}deg`},
//         {rotateY: `${yawAngle.toFixed(0)}deg`},
//       ]}
//       style={[
//         styles.face,
//         {
//           ...bounds.size,
//           left: bounds.origin.x,
//           top: bounds.origin.y,
//         },
//       ]}>
//       <Text style={styles.faceText}>ID: {faceID}</Text>
//       <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
//       <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
//     </View>
//   );

//   function renderLandmarksOfFace(face) {
//     const renderLandmark = position =>
//       position && (
//         <View
//           style={[
//             styles.landmark,
//             {
//               left: position.x - landmarkSize / 2,
//               top: position.y - landmarkSize / 2,
//             },
//           ]}
//         />
//       );
//     return (
//       <View key={`landmarks-${face.faceID}`}>
//         {renderLandmark(face.leftEyePosition)}
//         {renderLandmark(face.rightEyePosition)}
//         {renderLandmark(face.leftEarPosition)}
//         {renderLandmark(face.rightEarPosition)}
//         {renderLandmark(face.leftCheekPosition)}
//         {renderLandmark(face.rightCheekPosition)}
//         {renderLandmark(face.leftMouthPosition)}
//         {renderLandmark(face.mouthPosition)}
//         {renderLandmark(face.rightMouthPosition)}
//         {renderLandmark(face.noseBasePosition)}
//         {renderLandmark(face.bottomMouthPosition)}
//       </View>
//     );
//   }

//   const renderFaces = () => (
//     <View style={styles.facesContainer} pointerEvents="none">
//       {faces.map(renderFace)}
//     </View>
//   );

//   const renderLandmarks = () => (
//     <View style={styles.facesContainer} pointerEvents="none">
//       {faces.map(renderLandmarksOfFace)}
//     </View>
//   );

//   const renderTextBlocks = () => (
//     <View style={styles.facesContainer} pointerEvents="none">
//       {textBlocks.map(renderTextBlock)}
//     </View>
//   );

//   const renderTextBlock = ({bounds, value}) => (
//     <React.Fragment key={value + bounds.origin.x}>
//       <Text
//         style={[
//           styles.textBlock,
//           {left: bounds.origin.x, top: bounds.origin.y},
//         ]}>
//         {value}
//       </Text>
//       <View
//         style={[
//           styles.text,
//           {
//             ...bounds.size,
//             left: bounds.origin.x,
//             top: bounds.origin.y,
//           },
//         ]}
//       />
//     </React.Fragment>
//   );

//   const textRecognized = object => {
//     const {textBlocks} = object;
//     settextBlocks(textBlocks);
//   };

//   const barcodeRecognized = ({barcodes}) => setbarcodes(barcodes);

//   const renderBarcodes = () => (
//     <View style={styles.facesContainer} pointerEvents="none">
//       {barcodes.map(renderBarcode)}
//     </View>
//   );

//   const renderBarcode = ({bounds, data, type}) => (
//     <React.Fragment key={data + bounds.origin.x}>
//       <View
//         style={[
//           styles.text,
//           {
//             ...bounds.size,
//             left: bounds.origin.x,
//             top: bounds.origin.y,
//           },
//         ]}>
//         <Text style={[styles.textBlock]}>{`${data} ${type}`}</Text>
//       </View>
//     </React.Fragment>
//   );

//   const renderRecording = () => {
//     const backgroundColor = isRecording ? 'white' : 'darkred';
//     const action = isRecording ? stopVideo : takeVideo;
//     const button = isRecording ? renderStopRecBtn() : renderRecBtn();
//     return (
//       <TouchableOpacity
//         style={[
//           styles.flipButton,
//           {
//             flex: 0.3,
//             alignSelf: 'flex-end',
//             backgroundColor,
//           },
//         ]}
//         onPress={() => action()}>
//         {button}
//       </TouchableOpacity>
//     );
//   };

//   const stopVideo = async () => {
//     await camera.stopRecording();
//     setisRecording(false);
//   };

//   function renderRecBtn() {
//     return <Text style={styles.flipText}> REC </Text>;
//   }

//   function renderStopRecBtn() {
//     return <Text style={styles.flipText}> ☕ </Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <RNCamera
//         ref={camera}
//         style={{
//           flex: 1,
//           justifyContent: 'space-between',
//         }}
//         type={type}
//         zoom={zoom}
//         ratio={ratio}
//         flashMode={flash}
//         focusDepth={depth}
//         autoFocus={autoFocus}
//         whiteBalance={whiteBalance}
//         autoFocusPointOfInterest={autoFocusPoint.normalized}
//         androidCameraPermissionOptions={{
//           title: 'Permission to use camera',
//           message: 'We need your permission to use your camera',
//           buttonPositive: 'Ok',
//           buttonNegative: 'Cancel',
//         }}
//         faceDetectionLandmarks={
//           RNCamera.Constants.FaceDetection.Landmarks
//             ? RNCamera.Constants.FaceDetection.Landmarks.all
//             : undefined
//         }
//         onFacesDetected={canDetectFaces ? facesDetected : null}
//         onTextRecognized={canDetectText ? textRecognized : null}
//         onGoogleVisionBarcodesDetected={
//           canDetectBarcode ? barcodeRecognized : null
//         }>
//         <View style={StyleSheet.absoluteFill}>
//           <View style={[styles.autoFocusBox, drawFocusRingPosition]} />
//           <TouchableWithoutFeedback onPress={touchToFocus.bind(this)}>
//             <View style={{flex: 1}} />
//           </TouchableWithoutFeedback>
//         </View>
//         <View
//           style={{
//             flex: 0.5,
//             height: 72,
//             backgroundColor: 'transparent',
//             flexDirection: 'row',
//             justifyContent: 'space-around',
//           }}>
//           <View
//             style={{
//               backgroundColor: 'transparent',
//               flexDirection: 'row',
//               justifyContent: 'space-around',
//             }}>
//             <TouchableOpacity
//               style={styles.flipButton}
//               onPress={toggleFacing.bind(this)}>
//               <Text style={styles.flipText}> FLIP </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.flipButton}
//               onPress={toggleFlash.bind(this)}>
//               <Text style={styles.flipText}> FLASH: {flash} </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.flipButton}
//               onPress={toggleWB.bind(this)}>
//               <Text style={styles.flipText}> WB: {whiteBalance} </Text>
//             </TouchableOpacity>
//           </View>
//           <View
//             style={{
//               backgroundColor: 'transparent',
//               flexDirection: 'row',
//               justifyContent: 'space-around',
//             }}>
//             <TouchableOpacity
//               onPress={toggle('canDetectFaces')}
//               style={styles.flipButton}>
//               <Text style={styles.flipText}>
//                 {!canDetectFaces ? 'Detect Faces' : 'Detecting Faces'}
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={toggle('canDetectText')}
//               style={styles.flipButton}>
//               <Text style={styles.flipText}>
//                 {!canDetectText ? 'Detect Text' : 'Detecting Text'}
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={toggle('canDetectBarcode')}
//               style={styles.flipButton}>
//               <Text style={styles.flipText}>
//                 {!canDetectBarcode ? 'Detect Barcode' : 'Detecting Barcode'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={{bottom: 0}}>
//           <View
//             style={{
//               height: 20,
//               backgroundColor: 'transparent',
//               flexDirection: 'row',
//               alignSelf: 'flex-end',
//             }}>
//             <Slider
//               style={{width: 150, marginTop: 15, alignSelf: 'flex-end'}}
//               onValueChange={setFocusDepth.bind(this)}
//               step={0.1}
//               disabled={autoFocus === 'on'}
//             />
//           </View>
//           <View
//             style={{
//               height: 56,
//               backgroundColor: 'transparent',
//               flexDirection: 'row',
//               alignSelf: 'flex-end',
//             }}>
//             {renderRecording()}
//           </View>
//           {zoom !== 0 && (
//             <Text style={[styles.flipText, styles.zoomText]}>Zoom: {zoom}</Text>
//           )}
//           <View
//             style={{
//               height: 56,
//               backgroundColor: 'transparent',
//               flexDirection: 'row',
//               alignSelf: 'flex-end',
//             }}>
//             <TouchableOpacity
//               style={[styles.flipButton, {flex: 0.1, alignSelf: 'flex-end'}]}
//               onPress={zoomIn.bind(this)}>
//               <Text style={styles.flipText}> + </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.flipButton, {flex: 0.1, alignSelf: 'flex-end'}]}
//               onPress={zoomOut.bind(this)}>
//               <Text style={styles.flipText}> - </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.flipButton, {flex: 0.25, alignSelf: 'flex-end'}]}
//               onPress={toggleFocus.bind(this)}>
//               <Text style={styles.flipText}> AF : {autoFocus} </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.flipButton,
//                 styles.picButton,
//                 {flex: 0.3, alignSelf: 'flex-end'},
//               ]}
//               onPress={takePicture.bind(this)}>
//               <Text style={styles.flipText}> SNAP </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         {!!canDetectFaces && renderFaces()}
//         {!!canDetectFaces && renderLandmarks()}
//         {!!canDetectText && renderTextBlocks()}
//         {!!canDetectBarcode && renderBarcodes()}
//       </RNCamera>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 10,
//     backgroundColor: '#000',
//   },
//   flipButton: {
//     flex: 0.3,
//     height: 40,
//     marginHorizontal: 2,
//     marginBottom: 10,
//     marginTop: 10,
//     borderRadius: 8,
//     borderColor: 'white',
//     borderWidth: 1,
//     padding: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   autoFocusBox: {
//     position: 'absolute',
//     height: 64,
//     width: 64,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: 'white',
//     opacity: 0.4,
//   },
//   flipText: {
//     color: 'white',
//     fontSize: 15,
//   },
//   zoomText: {
//     position: 'absolute',
//     bottom: 70,
//     zIndex: 2,
//     left: 2,
//   },
//   picButton: {
//     backgroundColor: 'darkseagreen',
//   },
//   facesContainer: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     left: 0,
//     top: 0,
//   },
//   face: {
//     padding: 10,
//     borderWidth: 2,
//     borderRadius: 2,
//     position: 'absolute',
//     borderColor: '#FFD700',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   landmark: {
//     width: landmarkSize,
//     height: landmarkSize,
//     position: 'absolute',
//     backgroundColor: 'red',
//   },
//   faceText: {
//     color: '#FFD700',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     margin: 10,
//     backgroundColor: 'transparent',
//   },
//   text: {
//     padding: 10,
//     borderWidth: 2,
//     borderRadius: 2,
//     position: 'absolute',
//     borderColor: '#F00',
//     justifyContent: 'center',
//   },
//   textBlock: {
//     color: '#F00',
//     position: 'absolute',
//     textAlign: 'center',
//     backgroundColor: 'transparent',
//   },
// });
