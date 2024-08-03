"use client"
import { useState, useEffect } from "react";
import { firestore } from "../src/app/firebase";
import { Box, Grid, Typography, Stack, TextField, Button, Modal } from '@mui/material';
import { collection, query, getDocs, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import Link from 'next/link';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);
  const [open, setOpen] = useState(false);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const searchItem = async () => {
    if (!searchTerm) return;
    const docRef = doc(collection(firestore, "inventory"), searchTerm);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setSearchResult({ name: docSnap.id, ...docSnap.data() });
    } else {
      setSearchResult(null);
    }
    setSearchPerformed(true);
  };

  const addItemByName = async (name) => {
    const docRef = doc(collection(firestore, "inventory"), name);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
    await searchItem();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
    await searchItem();
  };

  const removeAllItems = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    await deleteDoc(docRef);
    await updateInventory();
    await searchItem();
  };

  const handleEditOpen = (item) => {
    setEditItem(item);
    setNewQuantity(item.quantity);
    setOpen(true);
  };

  const handleEditClose = () => {
    setEditItem(null);
    setOpen(false);
  };

  const handleUpdateQuantity = async () => {
    const docRef = doc(collection(firestore, "inventory"), editItem.name);
    await setDoc(docRef, { quantity: newQuantity }, { merge: true });
    await updateInventory();
    await searchItem(); // Update the search result
    handleEditClose();
  };

  useEffect(() => {
    updateInventory();
  }, []);

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

      <Grid container spacing={2} style={{ marginTop: '150px', width: '100%' }}>
        {/* Inventory List - Left Side */}
        <Grid item xs={9} >
          <Box border="1px solid #333" padding={2}>
            <Box 
              width="100%" 
              height="60px" 
              bgcolor="#2F4F4F" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              marginBottom={2}
            >
              <Typography variant="h4" color="#FFFFFF">
                Inventory Management 
              </Typography>
            </Box>
            
            {/* Labels */}
            <Box 
              display="flex" 
              alignItems="center" 
              justifyContent="space-between"
              padding={2}
              bgcolor="#e0e0e0"
            >
              <Typography variant="subtitle1" color="#333" style={{ flex: 1, paddingLeft: '15px' }}>
                Item
              </Typography>
              
              <Typography variant="subtitle1" color="#333" style={{ flex: 1, paddingLeft: '15px' }}>
                Quantity
              </Typography>

              <Box flex={2} display="flex" justifyContent="center">
                <Typography variant="subtitle1" color="#333" textAlign="center">
                  Actions
                </Typography>
              </Box>
            </Box>

            <Stack spacing={2} overflow="auto">
              {
                inventory.map(({ name, quantity }) => (
                  <Box 
                    key={name} 
                    width="100%" 
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    bgcolor="#D3D3D3"
                    padding={2} // Adjusted padding to make the box thinner
                  >
                    <Typography variant="h5" color="#333" style={{ flex: 1, paddingLeft: '15px' }}>
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Typography>
                    
                    <Typography variant="h5" color="#333" style={{ flex: 1, paddingLeft: '15px' }}>
                      {quantity}
                    </Typography>

                    <Stack direction="row" spacing={2} style={{ flex: 2, justifyContent: 'center' }}>
                      <Button variant="contained" size="small" style={{ backgroundColor: '#4CAF50', color: '#FFFFFF' }} onClick={() => addItemByName(name)}>
                        Add
                      </Button>

                      <Button variant="contained" size="small" style={{ backgroundColor: '#2196F3', color: '#FFFFFF' }} onClick={() => handleEditOpen({ name, quantity })}>
                        Edit
                      </Button>

                      <Button variant="contained" size="small" style={{ backgroundColor: '#F44336', color: '#FFFFFF' }} onClick={() => removeItem(name)}>
                        Remove
                      </Button>

                      <Button variant="contained" size="small" style={{ backgroundColor: '#8B0000', color: '#FFFFFF' }} onClick={() => removeAllItems(name)}>
                        Remove All
                      </Button>
                    </Stack>
                  </Box>
                ))
              }
            </Stack>
          </Box>
        </Grid>

        {/* Search Item Form - Right Side */}
        <Grid item xs={3}>
          <Box 
            border="1px solid #333" 
            padding={2} 
            display="flex" 
            flexDirection="column"
            alignItems="center"
            height="310px" // Set a fixed height
            width="300px" // Set a fixed width
          >
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              position="relative"
              marginBottom={2}
            >
              <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                bgcolor="#2F4F4F"
                zIndex={-1}
              />
              <Typography variant="h5" color="#FFFFFF" position="relative" zIndex={1}>
                Search Item
              </Typography>
            </Box>
            <TextField
              variant="outlined"
              label="Item Name"
              fullWidth 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              margin="normal"
            />

            {searchPerformed && searchResult === null ? (
              <Typography variant="body1" color="#FF0000" marginTop={2}>
                Item does not exist
              </Typography>
            ) : searchResult && (
              <Box marginTop={2} width="100%">
                <Typography variant="body1" color="#333" textAlign="center">
                  Item:  {searchResult.name.charAt(0).toUpperCase() + searchResult.name.slice(1)}
                </Typography>
                <Typography variant="body1" color="#333" textAlign="center">
                  Quantity: {searchResult.quantity}
                </Typography>
              </Box>
            )}

            <Button 
              variant="contained" 
              onClick={searchItem}
              style={{ marginTop: 'auto' }}
            >
              Search
            </Button>

            

            <Stack direction="row" spacing={1} justifyContent="center" marginTop={2}>
              <Button variant="contained" size="small" style={{ backgroundColor: '#4CAF50', color: '#FFFFFF' }} onClick={() => addItemByName(searchTerm)} >
                Add
              </Button>
              <Button variant="contained" size="small" style={{ backgroundColor: '#2196F3', color: '#FFFFFF' }} onClick={() => handleEditOpen(searchResult)}>
                Edit
              </Button>
              <Button variant="contained" size="small" style={{ backgroundColor: '#F44336', color: '#FFFFFF' }} onClick={() => removeItem(searchTerm)}>
                Remove
              </Button>
              <Button variant="contained" size="small" style={{ backgroundColor: '#8B0000', color: '#FFFFFF' }} onClick={() => removeAllItems(searchTerm)}>
                Remove All
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* Edit Quantity Modal */}
      <Modal open={open} onClose={handleEditClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <Typography variant="h6" marginBottom={2}>
            Edit Quantity
          </Typography>
          <TextField
            variant="outlined"
            label="Quantity"
            type="number"
            fullWidth
            value={newQuantity}
            onChange={(e) => setNewQuantity(Number(e.target.value))}
            margin="normal"
          />
          <Button
            variant="contained"
            onClick={handleUpdateQuantity}
            style={{ marginTop: '20px' }}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
