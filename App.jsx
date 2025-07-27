
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import Companies from '@/components/Companies';
import Calculations from '@/components/Calculations';
import Files from '@/components/Files';
import Settings from '@/components/Settings';
import Login from '@/components/auth/Login';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
    if(loggedIn) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'companies':
        return <Companies />;
      case 'calculations':
        return <Calculations />;
      case 'files':
        return <Files />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Login - DIFAL Pro</title>
          <meta name="description" content="Acesse o sistema DIFAL Pro para automação fiscal." />
        </Helmet>
        <Login onLogin={handleLogin} />
        <Toaster />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>DIFAL Pro - {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</title>
        <meta name="description" content="Sistema moderno e automatizado para cálculo e gestão do Diferencial de Alíquota do ICMS (DIFAL) interestadual." />
      </Helmet>
      
      <Layout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
        {renderContent()}
      </Layout>
      
      <Toaster />
    </>
  );
}

export default App;
