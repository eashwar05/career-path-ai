import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import CareerRecommendationsPage from './pages/CareerRecommendationsPage';
import SkillTrackerPage from './pages/SkillTrackerPage';
import ResourceHubPage from './pages/ResourceHubPage';
import MentorshipPage from './pages/MentorshipPage';

import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/resume-analyzer"
          element={
            <PrivateRoute>
              <ResumeAnalyzerPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/career-recommendations"
          element={
            <PrivateRoute>
              <CareerRecommendationsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/skill-tracker"
          element={
            <PrivateRoute>
              <SkillTrackerPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/resource-hub"
          element={
            <PrivateRoute>
              <ResourceHubPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/mentorship"
          element={
            <PrivateRoute>
              <MentorshipPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  </Router>
);

export default App;

