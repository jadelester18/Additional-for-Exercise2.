import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ onSubmit, initialValue }) => {
  const [form, setForm] = useState(
    initialValue || {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    //   website: "",
    }
  );

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const schema = Joi.object({
    title: Joi.string().min(2).max(500).required(),
    price: Joi.string().min(3).max(500).required(),
    // email: Joi.string()
    //   .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    //   .required(),
    description: Joi.string().min(6).max(500).allow("").optional(),
    category: Joi.string().min(6).max(500).allow("").optional(),
    // image: Joi.string().min(3).max(500).allow("").optional(),
    image: Joi.string().uri().allow("").optional(),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
    navigate("/");
  };

  const handleChange = ({ currentTarget: input }) => {
    setForm({
      ...form,
      [input.name]: input.value,
    });

    const { error } = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.name);

    if (error) {
      setErrors({ ...errors, [input.name]: error.details[0].message });
    } else {
      delete errors[input.name];
      setErrors(errors);
    }
  };

  const isFormInvalid = () => {
    const result = schema.validate(form);

    console.log(result);

    return !!result.error;
  };

  return (
    <Grid
      container
      component="form"
      justifyContent="center"
      sx={{marginTop: 3}}
      onSubmit={handleSubmit}
    >
      <Grid item xs={6}>
        <Card>
          <CardHeader title={`${initialValue ? "Edit" : "Add"} Product`} />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  error={!!errors.title}
                  helperText={errors.title}
                  onChange={handleChange}
                  value={form.title}
                  label="title"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="price"
                  error={!!errors.price}
                  helperText={errors.price}
                  onChange={handleChange}
                  value={form.price}
                  label="price"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  error={!!errors.description}
                  helperText={errors.description}
                  onChange={handleChange}
                  value={form.description}
                  label="description"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="category"
                  error={!!errors.category}
                  helperText={errors.category}
                  onChange={handleChange}
                  value={form.category}
                  label="category"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="image"
                  error={!!errors.image}
                  helperText={errors.image}
                  onChange={handleChange}
                  value={form.image}
                  label="image"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  name="website"
                  error={!!errors.website}
                  helperText={errors.website}
                  onChange={handleChange}
                  value={form.website}
                  label="Website"
                  variant="standard"
                  fullWidth
                />
              </Grid> */}
            </Grid>
          </CardContent>
          <CardActions>
            <Button disabled={isFormInvalid()} type="submit" fullWidth>
              Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductForm