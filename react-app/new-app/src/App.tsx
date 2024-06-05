import JsBridge from "@fy/bridge";
import { Layout, theme } from 'antd';
import React from 'react';
import { useRoutes } from "react-router-dom";
import Header from "./components/Header";
import Slider from "./components/Slider";
import routes from "./router";


console.log("111111-JsBridge", JsBridge);


const { Content } = Layout;


const App: React.FC = () => {
  const { token: { colorBgContainer } } = theme.useToken();

  const RouterView = useRoutes(routes)
  return (
    <Layout>
      <Slider></Slider>
      <Layout>
        <Header colorBgContainer={colorBgContainer}></Header>
        <Content
          style={{
            margin: '24px 16px',
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
        {RouterView}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;