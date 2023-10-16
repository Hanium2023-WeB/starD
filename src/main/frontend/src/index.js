import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const clientId = process.env.REACT_APP_NAVER_MAPS_CLIENT_ID;

const script = document.createElement('script');
script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
script.async = true;

script.onload = () => {
    // 스크립트가 로드된 후에 React 애플리케이션을 시작
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
};
document.head.appendChild(script);
