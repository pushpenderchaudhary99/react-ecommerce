/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import { ProductReviewCard } from "./ProductReviewCard";
import { women_dress } from "../../../data/Women/women_dress.js";
import { HomeSectionCard } from "../HomeSectionCard/HomeSectionCard.jsx";
import HomeSectionCarousel from "../HomeSectionCarousel/HomeSectionCarousel.jsx";
import { lingerie_bikini } from "../../../data/Women/lingree_bikini.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../States/Products/Action.js";
import { addItemToCart } from "../../../States/Cart/Action.js";
import AuthModal from "../Auth/AuthModal.jsx";
import {
  ratingsApi,
  ratingsApiWithoutAuth,
} from "../../../configuration/ApiConfig.js";

const products = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://img.tatacliq.com/images/i13/437Wx649H/MP000000018917482_437Wx649H_202308260154076.jpeg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://img.tatacliq.com/images/i13/437Wx649H/MP000000018917482_437Wx649H_202308260153557.jpeg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://img.tatacliq.com/images/i13/437Wx649H/MP000000018917482_437Wx649H_202308260154218.jpeg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://img.tatacliq.com/images/i13/437Wx649H/MP000000018917482_437Wx649H_202308260154244.jpeg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState(products.colors[0]);
  const [selectedSize, setSelectedSize] = useState(products.sizes[2]);
  const navigate = useNavigate();
  const { product } = useSelector((store) => store);
  const dispatch = useDispatch();
  const param = useParams();
  const jwt = localStorage.getItem("jwt");
  const [numRatings, setNumRatings] = useState(0);
  const [starRatingsCount, setStarRatingsCount] = useState(null);
  const [starRatingsPercentage, setStarRatingsPercentage] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const handelAddToCart = () => {
    if (jwt) {
      const data = {
        productId: param.productId,
        size: selectedSize.name,
        quantity: 1,
        price: product.product?.discountedPrice,
      };
      console.log("add item to cart :", data);
      dispatch(addItemToCart(data));
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  const getRatingStats = async (productId) => {
    try {
      const { data } = await ratingsApiWithoutAuth(
        `/api/ratings/stats/${productId}`
      );
      if (data) {
        setStarRatingsCount(data?.starCounts);
        setStarRatingsPercentage(data?.starPercentages);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const data = { productId: param.productId };
    //Fetcing data from backend
    dispatch(findProductById(data));
    getRatingStats(param.productId);
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, [param.productId]);
  useEffect(() => {
    console.log("IN USE EFFECT ::::::::::::::::::::::::::");
    setNumRatings(product?.product?.numRatings);
    const lavelOne =
      product?.product?.category?.parentCategory?.parentCategory?.name;
    const lavelTwo = product?.product?.category?.parentCategory?.name;
    const lavelThree = product?.product?.category?.name;
    console.log("ONE TOW THREE", lavelOne, lavelTwo, lavelThree);
    setBreadcrumbs([
      { id: 1, name: lavelOne, href: "#" },
      { id: 2, name: lavelTwo, href: "#" },
      {
        id: 3,
        name: lavelThree,
        href: `/${lavelOne}/${lavelTwo}/${lavelThree}`,
      },
    ]);
  }, [product?.product?.numRatings, product?.product]);
  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link
                    to={breadcrumb.href}
                    className="mr-2 font-medium text-gray-500 hover:text-gray-600 capitalize"
                  >
                    {breadcrumb?.name?.replace("_", " ")}
                  </Link>
                  {index === breadcrumbs?.length - 1 ? (
                    ""
                  ) : (
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>

        <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={product.product?.imageUrl}
                alt={products.images[0].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {[
                product.product?.imageUrl,
                product.product?.imageUrl,
                product.product?.imageUrl,
                product.product?.imageUrl,
              ].map((image) => (
                <div className="overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-5">
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Product info */}
          <div className="lg: col-span-1 maxt-auto max-w-2xl px-4 pb-60 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24  ">
            <div className="lg:col-span-2 ">
              {/* Brand Name */}
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                {product.product?.brand}
              </h1>
              {/* Product Title */}
              <h1 className="text:lg lg:text-xl  text-gray-900 opacity-60 pt-1 ">
                {product.product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                <p className="font-semibold">
                  {product.product?.discountedPrice}
                </p>
                <p className="opacity-50 line-through">
                  {product.product?.price}
                </p>
                <p className="text-green-600 font-semibold">
                  {product.product?.discountPersent}% off
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating
                    name="half-rating-read"
                    value={numRatings}
                    precision={0.5}
                    readOnly
                  />
                  <p className="opacity-50 text-sm">
                    {product.product?.ratings.length} Ratings
                  </p>
                  <p className="ml-3 text-sm font-medium text-indigo-600">
                    {product.product?.reviews.length} Revews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product.product?.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.quantity > 0}
                          className={({ active }) =>
                            classNames(
                              size.quantity > 0
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {size.quantity > 0 ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  variant="contained"
                  sx={{
                    px: "3rem",
                    py: "1rem",
                    bgcolor: "#9155fd",
                    my: "1rem",
                  }}
                  onClick={handelAddToCart}
                >
                  Add to cart
                </Button>
              </form>
            </div>

            <div className="py-5 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-5 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.product?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {products.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{products.details}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Rating and Reviews */}
        <section>
          <h1 className="font-semibold text-lg pb-4">
            Recent Review & Ratings
          </h1>
          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={7}>
                <div className="space-y-7">
                  {product?.product?.reviews.map((item) => (
                    <ProductReviewCard
                      reviewItem={item}
                      productId={param.productId}
                    />
                  ))}
                </div>
              </Grid>
              <Grid item xs={5}>
                <h1 className="text-xl font-semibold pb-1">Product Ratings</h1>
                <div className="flex items-center space-x-3">
                  <Rating
                    value={numRatings}
                    name="half-rating-read"
                    readOnly
                    precision={0.5}
                  ></Rating>
                  <p className="opacity-60">
                    {product?.product?.ratings?.length} Ratings
                  </p>
                </div>
                <Box>
                  {console.log("RATING COUNT", starRatingsCount)}
                  {console.log("RATING PERCENTAGE", starRatingsPercentage)}
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid xs={2}>
                      <p className="p-0">Excellent</p>
                    </Grid>
                    <Grid xs={7}>
                      <LinearProgress
                        className=""
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={starRatingsPercentage?.fiveStar}
                        color="success"
                      />
                    </Grid>
                    <Grid xs={2}>
                      <p className="opacity-50 p-2">
                        {starRatingsCount?.fiveStar}
                      </p>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid xs={2}>
                      <p className="p-0">Very Good</p>
                    </Grid>
                    <Grid xs={7}>
                      <LinearProgress
                        className=""
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={starRatingsPercentage?.fourStar}
                        color="success"
                      />
                    </Grid>
                    <Grid xs={2}>
                      <p className="opacity-50 p-2">
                        {starRatingsCount?.fourStar}
                      </p>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid item xs={2}>
                      <p className="p-0">Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        className=""
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={starRatingsPercentage?.threeStar}
                        color="warning"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <p className="opacity-50 p-2">
                        {starRatingsCount?.threeStar}
                      </p>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid xs={2}>
                      <p className="p-0">Avarage</p>
                    </Grid>
                    <Grid xs={7}>
                      <LinearProgress
                        className=""
                        sx={{
                          bgcolor: "#d0d0d0",
                          borderRadius: 4,
                          height: 7,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "#885c0a", // stroke color
                          },
                        }}
                        variant="determinate"
                        value={starRatingsPercentage?.twoStar}
                        color="success"
                      />
                    </Grid>
                    <Grid xs={2}>
                      <p className="opacity-50 p-2">
                        {starRatingsCount?.twoStar}
                      </p>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid xs={2}>
                      <p className="p-0">Poor</p>
                    </Grid>
                    <Grid xs={7}>
                      <LinearProgress
                        className=""
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={starRatingsPercentage?.oneStar}
                        color="error"
                      />
                    </Grid>
                    <Grid xs={2}>
                      <p className="opacity-50 p-2">
                        {starRatingsCount?.oneStar}
                      </p>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>
        {/* Similar Products */}
        <section className="pt-10">
          <h1 className="py-5 text-xl font-bold">Similar Products</h1>

          <div className="space-y-10 p0-10 flex flex-col justify-center">
            {console.log("PRODUCT STATE", product?.products)}
            <HomeSectionCarousel data={product?.products?.content} />
          </div>
        </section>
      </div>
    </div>
  );
}
