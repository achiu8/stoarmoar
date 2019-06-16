import React from 'react';
import { Breadcrumb, Col, Empty, Icon, Layout, Row, Spin } from 'antd';

import { chunksOf, filename, filesForAccount } from './utils';

import './styles/Files.css';

const Content = Layout.Content;

const COLUMNS = 8;

const position = (i, j) => COLUMNS * i + j;

const renderBreadcrumbs = (breadcrumbs, onClick) => (
  <Breadcrumb separator=">">
    {['My Files', ...breadcrumbs].map((breadcrumb, i) => (
      <Breadcrumb.Item
        key={i}
        className="Files-breadcrumb"
        onClick={() => onClick(i)}
      >
        {breadcrumb}
      </Breadcrumb.Item>
    ))}
  </Breadcrumb>
);

const renderEmpty = account => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description={account ? 'Folder is empty.' : 'Select account to view files.'}
  />
);

export default ({ account, breadcrumbs, files, loading, onClick, onBreadcrumb }) => (
  <Layout className="Files">
    <Spin size="large" spinning={loading}>
      <Content className="Files-content">
        <div className="Files-breadcrumbs">
          {renderBreadcrumbs(breadcrumbs, onBreadcrumb)}
        </div>
        {!files.length
          ? renderEmpty(account)
          : chunksOf(COLUMNS, filesForAccount(account, files)).map((row, i) => (
              <Row key={i} className="grid-row" gutter={48}>
                {row.map(({ id, name, type }, j) => (
                  <Col key={j} span={24 / COLUMNS}>
                    <div
                      className="grid-item"
                      onClick={() => type === 'folder' && onClick(name, position(i, j))}
                    >
                      <Icon className="grid-item-icon" type={type} />
                      <span>{filename(name)}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            ))
        }
      </Content>
    </Spin>
  </Layout>
);
