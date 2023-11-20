import React from 'react';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './Layout.scss';

function Layout() {
  return (
    <div data-testid='layout'>
      <CssBaseline />
      <Container maxWidth='xl'>
        <Box sx={{ padding: '5px' }}>
          <Outlet />
        </Box>
      </Container>
    </div>
  );
}

export default Layout;
