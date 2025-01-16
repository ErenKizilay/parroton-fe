import { ConfigProvider } from 'antd';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthProviderList from './auth/components/AuthProviderList';
import UploadHar from './common/components/UploadHar';
import './index.css';
import MainLayout from './layout/MainLayout';
import TestCaseListPage from './pages/TestCaseListPage';
import TestCasePage from './pages/TestCasePage';

const App: React.FC = () => {
  return (
    <>
      <ConfigProvider>
        <MainLayout />
        <React.Fragment>
          <Routes>
            <Route path='/upload' element={<UploadHar />} />
            <Route path='/test-cases' element={<TestCaseListPage></TestCaseListPage>} />
            <Route path='/auth-providers' element={<AuthProviderList customerId={'eren'} testCaseId={null} />} />
            <Route path='/test-cases/:id' element={<TestCasePage />} />

          </Routes>
        </React.Fragment>
      </ConfigProvider>
    </>
  );
};

export default App;