import React, { useState, useEffect } from 'react';
import { Box, Typography,  useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { connect } from 'react-redux';
import { fetchCategories } from '../../../actions/CategoryAction';
import { fetchSong } from '../../../actions/SongAction';
import { Link } from "react-router-dom";
const Invoices = (props) => {
  useEffect(() => {
    props.fetchCategories();
    props.fetchSong(); // Fetch both categories and songs
  }, []); // Empty dependency array to fetch data only once on component mount
  
  const { songs } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "songName", headerName: "Song Name", flex: 2 },
    { field: "Category", headerName: "Category", flex: 3 },
    { field: "Img", headerName: "Img", flex: 4 },
    { field: "Artist", headerName: "Artist", flex: 5 },
    {
      field: "Edit",
      headerName: "Edit",
      flex: 5,
      renderCell: (params) => (
        <Link to={`/songs_edit/${params.row.id}`} color="white" underline="hover">
          Edit
        </Link>
      ),
    },
    // Add more columns as needed
  ];
  // Map categories data to rows for the DataGrid
  const rows = songs.map(song => ({
    id: song._id, // Use the unique identifier from the song object
    songName: song.songName,
    Category: song.category,
    Img: song.imgSrc,
    Artist: song.artist,
    // Add more fields as needed
  }));
 
  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.CategoryAdmin.categories || [],
    songs: state.SongAdmin.songs || [],
  };
};

export default connect(mapStateToProps, { fetchCategories , fetchSong })(Invoices);
