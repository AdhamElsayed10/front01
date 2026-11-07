import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { BRAND } from './lib/colors';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import DocumentsPage from './pages/DocumentsPage';
import SettingsPage from './pages/SettingsPage';

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();

  // Wait for auth state to settle before making navigation decisions
  if (loading) {
    return (
      <div className="min-h-dvh bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Auth confirmed as empty — redirect to login
  if (!admin) {
    return <Navigate to="/manage" replace />;
  }

  // Authenticated — render children
  return children;
}

function PublicRoute({ children }) {
  const { admin, loading } = useAuth();

  // Wait for auth state to settle
  if (loading) return null;

  // Already authenticated — redirect to dashboard
  if (admin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Not authenticated — show public content (login page)
  return children;
}

function HiddenPage() {
  return <div className="relative z-[10000] min-h-dvh bg-white" aria-hidden="true" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          containerStyle={{ zIndex: 12000 }} // grain layer sits at 9999
          toastOptions={{
            style: {
              background: 'hsl(222 22% 9%)',
              color: 'hsl(210 25% 94%)',
              border: '1px solid hsl(220 12% 19%)',
              borderRadius: '10px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: BRAND.success, secondary: 'hsl(220 16% 14%)' } },
            error: { iconTheme: { primary: BRAND.destructive, secondary: 'hsl(210 20% 96%)' } },
          }}
        />
        <Routes>
          <Route path="/manage" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<HomePage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="/" element={<HiddenPage />} />
          <Route path="*" element={<HiddenPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
