// Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFilter } from '../store/productSlice';

const Sidebar = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const handleFilter = (filterType) => {
    dispatch(setFilter(filterType));
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItem>
          <ListItemText primary="Filters" />
        </ListItem>
        <Divider />
        <ListItem  onClick={() => handleFilter('price')}>
          <ListItemText primary="Filter by Price" />
        </ListItem>
        <ListItem  onClick={() => handleFilter('rating')}>
          <ListItemText primary="Filter by Rating" />
        </ListItem>
        {/* Add more filter options as needed */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
