import React, { useEffect } from 'react';
import './index.scss';
import { Button } from 'antd';
import {   useSearchParams  } from 'react-router-dom';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("111111-home11", searchParams.get('name'))
  return (
    <div className="App">
        <Button type="primary">首页</Button>
    </div>
  );
}




export default Home;
