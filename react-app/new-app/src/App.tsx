
import { Layout, theme } from 'antd';
import React from 'react';
import { useRoutes } from "react-router-dom";
// import VConsole from 'vconsole';
import Header from "./components/Header";
import Slider from "./components/Slider";
import routes from "./router";




const { Content } = Layout;


const App: React.FC = () => {
  const { token: { colorBgContainer } } = theme.useToken();

  const RouterView = useRoutes(routes)


  // useEffect(() => {
    

  //   setTimeout(() => {
  //     new VConsole();
  //     console.log('Hello world');
  //   }, 1000)
  // }, [])


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