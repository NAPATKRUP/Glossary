import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from '@ui-kitten/components';

const CustomEvaIcon = (data) => {
  const { color, name } = data.data;
  return (
    <Icon
      style={styles.icon}
      fill={color}
      name={name}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 22,
    width: 22,
  },
});

export default CustomEvaIcon;
