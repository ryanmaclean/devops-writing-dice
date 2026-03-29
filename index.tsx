import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { datadogRum } from '@datadog/browser-rum';

// Initialize Datadog RUM for frontend observability
const DD_APPLICATION_ID = import.meta.env.VITE_DD_APPLICATION_ID || "9629f53a-26d1-4923-91d4-e993db55ea06";
const DD_CLIENT_TOKEN = import.meta.env.VITE_DD_CLIENT_TOKEN || "pubf89ecefe17bd57a1b6ef68f101952e44";
const DD_SITE = import.meta.env.VITE_DD_SITE || "datadoghq.com";
const DD_SERVICE = import.meta.env.VITE_DD_SERVICE || "writing-dice";
const DD_ENV = import.meta.env.VITE_DD_ENV || "env:dev";

if (DD_APPLICATION_ID && DD_CLIENT_TOKEN) {
  datadogRum.init({
    applicationId: DD_APPLICATION_ID,
    clientToken: DD_CLIENT_TOKEN,
    site: DD_SITE,
    service: DD_SERVICE,
    env: DD_ENV,
    version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    trackBfcacheViews: true,
    defaultPrivacyLevel: 'allow',
  });
  
  datadogRum.startSessionReplayRecording();
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
