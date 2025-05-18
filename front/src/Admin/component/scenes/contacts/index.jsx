import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { connect } from 'react-redux';
import { fetchCategories } from '../../../actions/CategoryAction';

const Contacts = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    // Fetch categories data when the component mounts
    props.fetchCategories();
  }, []); // Empty dependency array to only run once when the component mounts

  const { categories } = props;

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    // Add more columns as needed
  ];

  // Map categories data to rows for the DataGrid
 
// Map categories data to rows for the DataGrid
const rows = categories.map((category, index) => ({
  id: index + 1, // Use the index as the unique id (you may need to adjust this based on your data)
  name: category.name,
  // Add more fields as needed
}));
  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          // Your styling here
        }}
      >
        <DataGrid
          rows={rows} // Pass the rows data to the DataGrid
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.CategoryAdmin.categories || [], // Ensure categories is initialized as an empty array if undefined
    // Other props if needed
  };
};

export default connect(mapStateToProps, { fetchCategories })(Contacts);
