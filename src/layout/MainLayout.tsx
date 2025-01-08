import { Layout, Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: "test-cases",
    label: `Test Cases`,
  },
  {
    key: "upload",
    label: `Upload`,
  },
  {
    key: "test",
    label: `Test`,
  }];

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          onSelect={(info => { navigate(info.key) })}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
    </Layout>
  );
};

export default MainLayout;