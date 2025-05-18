import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { createSongSuccess, createSongError } from '../../../actions/SongAction'; // Replace with your action creators
import { createSongs } from "../../../actions/AuthAdminAction";
import { connect } from 'react-redux';
import { fetchCategories } from '../../../actions/CategoryAction';

const Form = (props) => {
  const getAllCategory = async () => {
    await props.fetchCategories();
  }
  const dispatch = useDispatch();
  const [songData, setSongData] = useState({ artist: '' }); // Remove the title field
  const [selectedAudioFile, setSelectedAudioFile] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [songName, setSongName] = useState("");
  const [category, setCategory] = useState("");
  const [favourite, setFavourite] = useState("");
  const [type, setType] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");

   // Fetch categories on component mount
   useEffect(() => {
    getAllCategory();
  }, []);

  const handleChange = (event) => {
    setSongData({ ...songData, [event.target.name]: event.target.value });
  };

  const handleAudioFileChange = (event) => {
    setSelectedAudioFile(event.target.files[0]);
  };

  const handleImageFileChange = (event) => {
    setSelectedImageFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData();
    formData.append('artist', songData.artist);
    formData.append('song', selectedAudioFile);
    formData.append('imgSrc', selectedImageFile);
    formData.append('songName', songName); // Append songName to form data
    formData.append('category', category);
    formData.append('favourite', favourite);
    formData.append('type', type);

    try {
      // Dispatch action to create song with form data
      await props.createSongs(formData);
      console.log('Song created successfully!');
      // Clear form fields
     
    } catch (error) {
      console.error('Error creating song:', error);
    }
  };

  return (
    <Box m="20px">
    <Header title="CREATE SONG" subtitle="Create a New Song" />
    <Formik
      initialValues={{ songName: '', favourite: false, type: '', artist: '', color: '', category: '' }}
      validationSchema={checkoutSchema}
   
    >
      {({
      
        errors,
        touched,
        handleBlur,
       
      
      }) => (
        <form onSubmit={handleSubmit} >
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {/* Other form fields */}
            {/* Remove the title field */}
               <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Artist"
              onBlur={handleBlur}
              value={songData.artist}
              onChange={handleChange}
              name="artist"
           
              sx={{ gridColumn: "span 2" }}
            />
             
            <TextField
              fullWidth
              variant="filled"
              type="file"
              label="Song"
              onBlur={handleBlur}
              onChange={handleAudioFileChange} 
              name="song"
               
              error={!!touched.song && !!errors.song}
              helperText={touched.song && errors.song}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="file"
              label="Image Source"
              onBlur={handleBlur}
              onChange={handleImageFileChange} 
              name="imgSrc"
              
              error={!!touched.imgSrc && !!errors.imgSrc}
              helperText={touched.imgSrc && errors.imgSrc}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Song Name"
                onBlur={handleBlur}
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
                name="songName"
                error={!!touched.songName && !!errors.songName}
               
                sx={{ gridColumn: "span 2" }}
              />
                 <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  onBlur={handleBlur}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  name="category"
                  error={!!touched.category && !!errors.category}
                >
                  {props.categories.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Favourite"
                onBlur={handleBlur}
                onChange={(e) => setFavourite(e.target.value)}
                value={favourite}
                name="favourite"
                error={!!touched.favourite && !!errors.favourite}
              
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Type"
                onBlur={handleBlur}
                onChange={(e) => setType(e.target.value)}
                value={type}
                name="type"
                error={!!touched.type && !!errors.type}
                helperText={touched.type && errors.type}
                sx={{ gridColumn: "span 4" }}
              />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Create New Song
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
  );
};
const checkoutSchema = yup.object().shape({
  songName: yup.string().required("Song name is required"),
 
  favourite: yup.boolean().required("Favourite status is required"),
  // Add validation for other fields here
});
const mapStateToProps = state => {
  return {
    categories: state.CategoryAdmin.categories || [], // Ensure categories is initialized as an empty array if undefined
    // Other props if needed
  };
};

export default connect(mapStateToProps, { fetchCategories, createSongs })(Form);
