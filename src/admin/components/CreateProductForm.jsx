import React, { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { createProduct } from "../../States/Products/Action";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];
const topLevelCategories = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
];

const secondLevelCategories = [
  { value: "clothing", label: "Clothing" },
  { value: "accessories", label: "Accessories" },
];

const thirdLevelCategories = [
  { label: "Women Tops", value: "top" },
  { label: "Women Dresses", value: "women_dress" },
  { label: "Women Jeans", value: "women_jeans" },
  { label: "Sarees", value: "saree" },
  { label: "Lengha Choli", value: "lengha_choli" },
  { label: "Womens Kurtis", value: "kurtis" },
  { label: "Womens Activewear", value: "womens_ativewear" },
  { label: "Lingree", value: "lingree" },
  { label: "Womens Watches", value: "womens_watches" },
  { label: "womens Bags", value: "womens_bags" },
  { label: "Womens Sunglasses", value: "women_sunglasses" },
  { label: "Mens T-Shirts", value: "t-shirt" },
  { label: "Mens Shirt", value: "shirt" },
  { label: "Mens Jackets", value: "mens_jackets" },
  { label: "Mens Activewear", value: "mens_ativewear" },
  { label: "Mens Ethnic Wear", value: "mens_ethnic_wear" },
  { label: "Mens Watches", value: "mens_watches" },
  { label: "Mens Sunglasses", value: "mens_sunglasses" },
];

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPersent: "",
    size: initialSizes,
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const calculateDiscount = () => {
    productData.discountPersent = Math.floor(
      ((productData.price - productData.discountedPrice) / productData.price) *
        100
    );
    return productData.discountPersent;
  };
  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleAddSize = () => {
    const sizes = [...productData.size];
    sizes.push({ name: "", quantity: "" });
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleRemoveSize = (index) => {
    const sizes = [...productData.size];
    sizes.splice(index, 1);
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
    // You can dispatch the product data to your redux store or perform any other actions here
    dispatch(createProduct({ data: productData }));
  };

  return (
    <div className="m-5 p-5 bg-white border max-w-[70rem] ml-20 shadow-xl rounded-lg">
      <form onSubmit={handleSubmit}>
        <Typography variant="h3" sx={{ textAlign: "center", mb: 4 }}>
          Add New Product
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box className=" border h-14 w-28 flex justify-center items-center rounded-md text-green-600 bg-green-200 font-bold underline">
              {calculateDiscount() > 0 ? productData.discountPersent : "0"}% off
            </Box>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLevelCategory"
                value={productData.topLevelCategory}
                onChange={handleChange}
                label="Top Level Category"
              >
                {topLevelCategories?.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLevelCategory"
                value={productData.secondLevelCategory}
                onChange={handleChange}
                label="Second Level Category"
              >
                {secondLevelCategories?.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLevelCategory"
                value={productData.thirdLevelCategory}
                onChange={handleChange}
                label="Third Level Category"
              >
                {thirdLevelCategories?.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              name="description"
              rows={3}
              onChange={handleChange}
              value={productData.description}
            />
          </Grid>
          {productData.size?.map((size, index) => (
            <Grid container item spacing={3} key={index}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Size Name"
                  name="name"
                  value={size.name}
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={size.quantity}
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  onClick={() => handleRemoveSize(index)}
                  size="large"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            variant="outlined"
            sx={{ p: 1.8, mt: 2, ml: 2, width: "10rem" }}
            onClick={handleAddSize}
          >
            <AddIcon />
            <span className="ml-3">Add Size</span>
          </Button>
          <Grid item xs={12} className="flex justify-center pb-5">
            <Button
              variant="contained"
              sx={{ p: 1.8, mt: 2, width: "30rem" }}
              size="large"
              type="submit"
            >
              Add New Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProductForm;
