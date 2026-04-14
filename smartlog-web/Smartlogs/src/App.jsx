import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Introduction from './pages/Introduction';
import GetStarted from './pages/GetStarted';
import Installation from './pages/Installation';
import Architecture from './pages/Architecture';
import APIRef from './pages/APIRef';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Introduction />} />
          <Route path="get-started" element={<GetStarted />} />
          <Route path="installation" element={<Installation />} />
          <Route path="architecture" element={<Architecture />} />
          <Route path="api" element={<APIRef />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
