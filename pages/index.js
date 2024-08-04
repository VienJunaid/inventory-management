import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
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
      <Box mt="150px" width="100%" display="flex" justifyContent="space-around">
        {/* Weekly Reports Section */}
        <Box width="45%" bgcolor="#E0E0E0" padding={4} borderRadius={2}>
          <Typography variant="h5" mb={2} align="center">Weekly Reports </Typography>
          <Typography variant="h6" mb={1}>Charts</Typography>
          <Typography variant="body1" mb={2}>[Charts Placeholder]</Typography>
          <Typography variant="h6" mb={1}>Summaries</Typography>
          <Typography variant="body1" mb={2}>[Summaries Placeholder]</Typography>
          <Typography variant="h6" mb={1}>Recent Activities</Typography>
          <Typography variant="body1">[Recent Activities Placeholder]</Typography>
        </Box>

        {/* Alerts Section */}
        <Box width="45%" bgcolor="#E0E0E0" padding={4} borderRadius={2}>
          <Typography variant="h5" mb={2} align="center" >Alerts</Typography>
          <Typography variant="h6" mb={1}>Low Stock</Typography>
          <Typography variant="body1" mb={2}>[Low Stock Placeholder]</Typography>
          <Typography variant="h6" mb={1}>High Stock</Typography>
          <Typography variant="body1" mb={2}>[High Stock Placeholder]</Typography>
          <Typography variant="h6" mb={1}>Old Stock</Typography>
          <Typography variant="body1">[Old Stock Placeholder]</Typography>
        </Box>
      </Box>
    </Box>
  );
}
