import { Button, Flex, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import logo from './assets/parroton-mini.jpeg';
import AuthProviderList from './auth/components/AuthProviderList';
import UploadHar from './common/components/UploadHar';
import TestCaseListPage from './pages/TestCaseListPage';
import TestCasePage from './pages/TestCasePage';

import {
  RocketOutlined,
  SafetyOutlined,
  UploadOutlined
} from '@ant-design/icons';
import AuthProviderPage from './pages/AuthProviderPage';


const items = [
  {
    key: "test-cases",
    label: `Test Cases`,
    icon: <RocketOutlined />
  },
  {
    key: "upload",
    label: `Upload`,
    icon: <UploadOutlined />
  },
  {
    key: "auth-providers",
    label: `Auth Providers`,
    icon: <SafetyOutlined />
  },
  {
    key: "test",
    label: `Test`,
  }];

const App: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: "space-between",
        }}
      >
        <Flex align="center">
          <img
            src={logo}
            alt="Logo"
            style={{
              height: '40px',
              marginRight: '16px',
            }}
          />
          <div style={{ color: '#fff', fontSize: '20px' }}>Parroton</div>
        </Flex>
        <Flex gap={10} justify="flex-end">
          {items.map(i => <Button variant="solid" icon={i.icon} type="primary" onClick={(e) => navigate(i.key)}>{i.label}</Button>)}
        </Flex>
      </Header>
      <Content style={{ padding: '0 48px', margin: 6 }}>
        <Routes>
          <Route path='/upload' element={<UploadHar />} />
          <Route path='/test-cases' element={<TestCaseListPage></TestCaseListPage>} />
          <Route path='/auth-providers/:id' element={<AuthProviderPage />} />
          <Route path='/auth-providers' element={<AuthProviderList testCaseId={null} />} />
          <Route path='/test-cases/:id' element={<TestCasePage />} />
        </Routes>
      </Content>
      
    </Layout>
  );
};

export default App;