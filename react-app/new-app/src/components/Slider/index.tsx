import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { objToQueryStr } from "../../router";
import "./index.less";

const {  Sider } = Layout;

const PageSider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken();




  const onselect = (data: any) => {

    navigate(objToQueryStr(data.key, {name: 1, age: 2}))
  }



  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className='sider-container' style={{ background: colorBgContainer }}>
        <div className="head" >
        <Button className="btn" type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)}/>
  
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          onSelect={onselect}
          items={[
            {
              key: '/home',
              icon: <UserOutlined />,
              label: '系统管理',
            },
            {
              key: '/sys',
              icon: <VideoCameraOutlined />,
              label: '配置中心',
            },
          ]}
        />
      </Sider>
  );
};

export default PageSider;