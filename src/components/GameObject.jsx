/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Static from './GameObjects/Static';
import Teleport from './GameObjects/Teleport';
import Vehicle from './GameObjects/Vehicle';
import Base from './GameObjects/Base';

function GameObject(props) {
  switch (props.objectType) {
    case 'static':
      return <Static {...props} />;
    case 'teleport':
      return <Teleport {...props} />;
    case 'moving':
      return <Vehicle {...props} />;
    case 'empty':
      return <Base {...props} />;
    default:
      throw new Error('Incorrect Game Object type');
  }
}

function MemoizedGameObject({ objectType, disabled }) {
  return React.useMemo(
    () => <GameObject objectType={objectType} disabled={disabled} />,
    [objectType, disabled],
  );
}

export default MemoizedGameObject;
