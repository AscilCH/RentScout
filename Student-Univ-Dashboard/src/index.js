import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

// Use createRoot to render the main component
createRoot(rootElement).render(<App />);

