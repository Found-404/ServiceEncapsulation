import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
