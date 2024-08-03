import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  }

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" alignItems="center">
      {/* Header Section */}
      <Box
        width="100%"
        height="100px"
        bgcolor="#1976d2"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="fixed"
        top={0}
        left={0}
        zIndex={1000}
      >
        <Typography variant="h2" color="white">
          Pantry Inventory
        </Typography>
      </Box>

      {/* Navigation Buttons */}
      <Box
        width="100%"
        mt="100px"
        display="flex"
        justifyContent="center"
        gap={2}
        padding={2}
        bgcolor="#f8f9fa"
        position="fixed"
        top="100px"
        left={0}
        zIndex={1000}
      >
        <Button variant="contained" onClick={() => navigateTo('/')}>Home</Button>
        <Button variant="contained" onClick={() => navigateTo('/inventory')}>Inventory</Button>
        <Button variant="contained" onClick={() => navigateTo('/analytics')}>Analytics</Button>
        <Button variant="contained" onClick={() => navigateTo('/settings')}>Settings</Button>
      </Box>

      {/* Page Content */}
      <Box mt="200px" width="100%" display="flex" justifyContent="center">
        {children}
      </Box>
    </Box>
  );
}
