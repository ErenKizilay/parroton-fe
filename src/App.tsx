import { alpha, Box, CssBaseline, Stack } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppNavbar from './layout/AppNavBar';
import Header from './layout/Header';
import SideMenu from './layout/SideMenu';
import TestCasePage from './pages/TestCasePage';
import TestCasesPage from './pages/TestCasesPage';
import AppTheme from './theme/AppTheme';
import AuthProvidersPage from './pages/AuthProvidersPage';
import ImportTestCasePage from './pages/ImportTestCasePage';

function App() {

  return (
    <AppTheme>
      <CssBaseline enableColorScheme>
        <Box sx={{ display: 'flex' }}>
          <SideMenu />
          <AppNavbar />
          {/* Main content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: alpha(theme.palette.background.default, 1),
              overflow: 'auto',
            })}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 },
              }}
            >
              <Header />
              <React.Fragment>
                <Routes>
                  <Route path="/" element={<TestCasesPage />} />
                  <Route path="/auth-providers" element={<AuthProvidersPage />} />
                  <Route path="/test-cases/:id" element={<TestCasePage />} />
                  <Route path="/import" element={<ImportTestCasePage />} />
                </Routes>
              </React.Fragment>
            </Stack>
          </Box>
        </Box>
      </CssBaseline>
    </AppTheme>
  );
}

export default App
