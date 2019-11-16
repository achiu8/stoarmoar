import React from 'react';
import { Breadcrumb } from 'antd';

export default ({ items, onClick }) => (
  <div className="Files-breadcrumbs">
    <Breadcrumb separator=">">
      {['My Files', ...items].map((item, i) => (
        <Breadcrumb.Item
          key={i}
          className="Files-breadcrumb"
          onClick={() => onClick(i)}
        >
          {item}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  </div>
);
