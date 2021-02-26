import React from 'react';
import { Icon } from '@ui-kitten/components';

const EvaIcon = (props) => {
  const { color, name, size } = props;
  return (
    <Icon
      style={{
        height: size,
        width: size,
      }}
      fill={color}
      name={name}
    />
  );
};

export default EvaIcon;
