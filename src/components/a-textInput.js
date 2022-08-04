import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Aicon from './a-icon';
import AText from './a-text';

export default function AtextInput(props) {
  const {onPress, margin, width} = props;
  return (
    <View
      style={[
        style.container,
        width && {width: width},
        {margin: margin ? margin : 20},
      ]}>
      <TextInput
        {...props}
        style={style.input}
        placeholderTextColor="grey"
        placeholder="Search"
				// onChange={}
				// onFocus={}
				// onEndEditing={}
				// onTextInput={}
			
      />
      <TouchableOpacity style={style.icon} onPress={onPress}>
        <Aicon type="Octicons" name="search" size={20} color="grey" />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: 45,

    borderRadius: 20,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 20,
    color: '#000',
  },
  icon: {
    position: 'absolute',
    right: 16,
  },
});
