import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/geist-mono/400.css';
import './styles/tokens.css';
import './styles/typography.css';
import './styles/base.css';
import './styles/motion.css';
import './showcase/showcase.css';
import { App } from './showcase/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
