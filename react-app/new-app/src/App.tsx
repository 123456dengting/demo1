import React, { useState } from 'react';
import { Layout, Button, theme } from 'antd';
import Slider from "./components/Slider";
import Header from "./components/Header";
import {  Route, Routes, useRoutes } from "react-router-dom"
import Home from "./view/Home"
import Sys from "./view/Sys"
import routes from "./router"

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