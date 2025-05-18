import React, { useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { createCategory } from "../../../actions/AuthAdminAction";
import { connect } from 'react-redux';

const Team = (props) => {
  const [category, setCategory] = useState('');
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const User = { name: category }; // Change 'category' to 'name'
    console.log('Form submitted with values:', User);
    await props.createCategory(User);
    console.log('createCategory action dispatched successfully');
    window.location.reload();
  }

  return (
    <Box m="20px">
      <Header title="CREATE Category" subtitle="Create a New Category" />

      <Formik
        initialValues={{ name: '' }} // Update initial values to use 'name'
        validationSchema={checkoutSchema}
        // onSubmit={handleSubmit} // Add onSubmit handler to Formik
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          // handleSubmit, // Add handleSubmit from Formik
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
                label="Category"
                onBlur={handleBlur}
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                name="name" // Update name attribute to 'name'
                error={!!touched.name && !!errors.name} // Update error and touched attributes
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Category
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Category is required"), // Update validation schema
});

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { createCategory })(Team);
