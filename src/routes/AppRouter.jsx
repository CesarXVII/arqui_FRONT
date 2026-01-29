import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '/src/pages/home/Home';
import BlackboardLayout from '../pages/BlackboardLayout/BlackboardLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import ShareProjectPage from '../pages/ShareProject/ShareProjectPage';

const AppRouter = () => (
  <Routes>
    <Route
      path="/"
      element={<Home />}
    />
    <Route
      path="/home"
      element={<Home />}
    />
    <Route
      path="/blackboard"
      element={<BlackboardLayout />}
    />
    <Route
      path="/dashboard"
      element={<Dashboard />}
    />
    <Route
      path="/share/:token"
      element={<ShareProjectPage />}
    />
  </Routes>
);

export default AppRouter;