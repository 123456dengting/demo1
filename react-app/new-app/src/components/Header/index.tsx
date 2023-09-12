import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
const { Header } = Layout;

interface PageHeaderprops  {
    colorBgContainer: string
}

const PageHeader = (props: PageHeaderprops) => {
//   const [collapsed, setCollapsed] = useState(false);

  const {colorBgContainer} = props;

  const onClick = () => {}
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
    <Button
      type="text"
    //   icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    //   onClick={onClick}
      style={{
        fontSize: '16px',
        width: 64,
        height: 64,
      }}
    />
  </Header>
  );
};


export default PageHeader;