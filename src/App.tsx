import { ConfigProvider } from 'antd';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './index.css';
import MainLayout from './layout/MainLayout';
import TestCaseListPage from './pages/TestCaseListPage';
import TestCasePage from './pages/TestCasePage';
import UploadHar from './components/UploadHar';

const items = [{
  key: "test-cases",
  label: `Test Cases`,
},
{
  key: "test",
  label: `Test`,
}];

const App: React.FC = () => {
  return (
    <>
      <ConfigProvider>
        <MainLayout />
        <React.Fragment>
          <Routes>
            <Route path='upload' element={<UploadHar/>}/>
            <Route path='/test-cases' element={<TestCaseListPage></TestCaseListPage>} />
            <Route path='test-cases/:id' element={<TestCasePage />} />
          </Routes>
        </React.Fragment>
      </ConfigProvider>
    </>
  );
};

export default App;