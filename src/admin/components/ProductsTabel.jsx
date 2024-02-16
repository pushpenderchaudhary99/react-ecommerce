import {
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductById, findProducts } from "../../States/Products/Action";

const ProductsTabel = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);
  const [page, setPage] = useState();
  const [render, setRender] = useState(false);
  const handelPaginationChange = (event, value) => {
    setPage(value);
  };
  const handelDeleteItem = (id) => {
    console.log("DELETING ITEM WITH ID :", id);
    deleteProductById({ productId: id }).then((result) => {
      if (result === true) setRender(!render);
    });
  };
  const fetchData = () => {
    //setting up data to pass as url to backend
    const data = {
      category: "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: page - 1 || 0,
      pageSize: 6,
      stock: "",
    };

    dispatch(findProducts(data));
  };
  useEffect(() => {
    fetchData();
  }, [page, render]);
  return (
    <>
      <div className="p-5 w-[80rem]">
        {" "}
        <TableContainer
          component={Paper}
          sx={{ background: "#eaeaea", width: "full", padding: "5px" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Images</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Top Category</TableCell>
                <TableCell align="center">Color</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product.products?.content?.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-[3rem] h-[3rem] object-cover object-top rounded-3xl"
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.title}
                  </TableCell>
                  <TableCell align="center" className="capitalize">
                    {item.category?.name.replace(/_/g, " ")}
                  </TableCell>
                  <TableCell align="center" className="capitalize">
                    {item.category?.parentCategory?.parentCategory?.name}
                  </TableCell>
                  <TableCell align="center" className="first-letter:uppercase">
                    {item.color}
                  </TableCell>
                  <TableCell align="center">
                    {item.sizes.reduce(
                      (total, size) => total + size.quantity,
                      0
                    )}
                  </TableCell>
                  <TableCell align="center">
                    &#8377; {item.discountedPrice}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      style={{ color: "red", borderColor: "red" }}
                      onClick={() => handelDeleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center">
            <Pagination
              count={product.products?.totalPages}
              shape="rounded"
              size="large"
              onChange={handelPaginationChange}
            />
          </div>
        </TableContainer>
      </div>
    </>
  );
};

export default ProductsTabel;
