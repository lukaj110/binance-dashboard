import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './components/main';
import { API_KEY, SECRET_KEY } from './state';
import './App.css';

export default function App() {
  const [apiKey, setApiKey] = useAtom(API_KEY);
  const [secretKey, setSecretKey] = useAtom(SECRET_KEY);

  useEffect(() => {
    setApiKey(localStorage.getItem('API_KEY') || '');
    setSecretKey(localStorage.getItem('SECRET_KEY') || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem('API_KEY') !== apiKey) {
      localStorage.setItem('API_KEY', apiKey);
    }
  }, [apiKey]);

  useEffect(() => {
    if (localStorage.getItem('SECRET_KEY') !== secretKey) {
      localStorage.setItem('SECRET_KEY', secretKey);
    }
  }, [secretKey]);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
