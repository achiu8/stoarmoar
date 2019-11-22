import React from 'react';
import { Icon, Radio } from 'antd';

import { LAYOUT } from '../contexts/AccountSettings';

const ICONS = {
  [LAYOUT.GRID]: 'appstore',
  [LAYOUT.LIST]: 'menu',
};

export default ({ layout, setLayout }) => (
  <Radio.Group
    buttonStyle="solid"
    onChange={e => setLayout(e.target.value)}
    value={layout}
  >
    {Object.values(LAYOUT).map(type => (
      <Radio.Button key={type} value={type}>
        <Icon type={ICONS[type]} />
      </Radio.Button>
    ))}
  </Radio.Group>
);
