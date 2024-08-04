import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function Analytics() {
  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" alignItems="center">
      {/* Navigation Buttons */}
      <Box
        width="100%"
        height="100px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#2F4F4F"
        position="fixed"
        top={0}
        left={0}
        zIndex={1000}
      >
        <Link href="/" passHref>
          <Button variant="contained" style={{ backgroundColor: "#333333", margin: '0 10px' }}>Home</Button>
        </Link>
        <Link href="/inventory" passHref>
          <Button variant="contained" style={{ backgroundColor: "#333333", margin: '0 10px' }}>Inventory</Button>
        </Link>
        <Link href="/analytics" passHref>
          <Button variant="contained" style={{ backgroundColor: "#333333", margin: '0 10px' }}>Analytics</Button>
        </Link>
        <Link href="/settings" passHref>
          <Button variant="contained" style={{ backgroundColor: "#333333", margin: '0 10px' }}>Settings</Button>
        </Link>
      </Box>

      {/* Main Content */}
      <Box mt="150px" width="100%" display="flex" justifyContent="center">
        <Typography variant="h4">Welcome to the Analytics Page!</Typography>
      </Box>
      
      <Box>
        {/* Add your Analytics chart and graphs here */}

      </Box>





    </Box>
  );
}
