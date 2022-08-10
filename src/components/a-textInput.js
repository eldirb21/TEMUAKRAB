import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Aicon from './a-icon';
import AText from './a-text';

export default function AtextInput(props) {
  const {onPress, margin, width, textColor} = props;
  return (
    <View
      style={[
        style.container,
        width && {width: width},
        {margin: margin ? margin : 20},
      ]}>
      <TextInput
        {...props}
        style={[
          style.input,
          {
            color: textColor ? textColor : '#000',
            borderColor: textColor ? textColor : 'grey',
          },
        ]}
        placeholderTextColor={textColor ? textColor : 'grey'}
        placeholder="Search"
        // onChange={}
        // onFocus={}
        // onEndEditing={}
        // onTextInput={}
      />
      <TouchableOpacity style={style.icon} onPress={onPress}>
        <Aicon
          type="Octicons"
          name="search"
          size={20}
          color={textColor ? textColor : 'grey'}
        />
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

    paddingHorizontal: 20,
  },
  icon: {
    position: 'absolute',
    right: 16,
  },
});
