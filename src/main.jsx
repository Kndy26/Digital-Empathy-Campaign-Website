import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { CampaignProvider } from './context/CampaignContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CampaignProvider>
        <App />
      </CampaignProvider>
    </BrowserRouter>
  </StrictMode>,
);
