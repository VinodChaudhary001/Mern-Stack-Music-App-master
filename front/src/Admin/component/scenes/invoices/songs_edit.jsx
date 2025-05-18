import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateSong } from "../../../actions/AuthAdminAction";
import { connect } from 'react-redux';
import { fetchCategories } from '../../../actions/CategoryAction';
import { fetchSong } from '../../../actions/SongAction';

const SongsEdit = (props) => {
    const dispatch = useDispatch();
    const [songData, setSongData] = useState({ });
    const [selectedAudioFile, setSelectedAudioFile] = useState(null);
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [artist, setartist] = useState("");
    const [songName, setSongName] = useState("");
    const [category, setCategory] = useState("");
    const [favourite, setFavourite] = useState(false); 
    const [type, setType] = useState("");
    const isNonMobile = useMediaQuery("(min-width:600px)");

    useEffect(() => {
        // Fetch song data based on the ID passed as a parameter
        const fetchSongData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getsongs/${props.match.params.id}`);
                const song = response.data; // Assuming response.data is the song object
                setSongData({
                    artist: song.artist,
                    songName: song.songName,
                    category: song.category,
                    favourite: song.favourite || false,
                    type: song.type,
                });
            } catch (error) {
                console.error('Error fetching song data:', error);
            }
        };

        fetchSongData();
    }, [props.match.params.id]);

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
        formData.append('artist', artist);
        formData.append('song', selectedAudioFile);
        formData.append('imgSrc', selectedImageFile);
        formData.append('songName', songName);
        formData.append('category', category);
        formData.append('favourite', favourite);
        formData.append('type', type);

        try {
            await props.updateSong(props.match.params.id, formData);
            console.log('Song updated successfully!');
        } catch (error) {
            console.error('Error updating song:', error);
        }
    };

    return (
        <Box m="20px">
            <Header title="EDIT SONG" subtitle="Edit Song Details" />
            <Formik
                 initialValues={{
                    artist: '', // This will be set dynamically
                    songName: '', // This will be set dynamically
                    category: '', // This will be set dynamically
                    favourite: false, // Initial value for favourite
                    type: '', // Initial value for type
                }}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                   
                    handleBlur,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Artist"
                                onBlur={handleBlur}
                                value={songData?.artist}
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
                                value={songData?.songName}
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
                                    value={songData?.category}
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
                                onChange={handleChange}
                                value={values.favourite}
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
                                value={songData?.type}
                                name="type"
                                error={!!touched.type && !!errors.type}
                                helperText={touched.type && errors.type}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Update Song
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
        categories: state.CategoryAdmin.categories || [],
    };
};

export default connect(mapStateToProps, { fetchCategories, updateSong, fetchSong })(SongsEdit);
