import { createRoot } from 'react-dom/client';
import { Suspense } from 'react';
import App from './App.tsx';
import LoadingScreen from './components/shared/LoadingScreen.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<LoadingScreen />}>
    <App />
  </Suspense>
);