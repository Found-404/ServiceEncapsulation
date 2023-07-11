import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);
