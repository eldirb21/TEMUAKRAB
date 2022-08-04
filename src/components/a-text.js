import React from 'react';
import {Text} from 'react-native';

export default function AText(props) {
  const defStyle = {
    fontSize: 14,
    color: '#000',
  };
  const incStyle = Array.isArray(props.style) ? props.style : [props.style];

  return <Text {...props} style={[defStyle, ...incStyle]} />;
}
