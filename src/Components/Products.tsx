import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { MouseEvent } from "react";

interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productCategory: string;
  updatedPrice?: number;
  productQuantity: number;
}

interface ProductsProps {
  products: Product[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Products: React.FC<ProductsProps> = ({ products }) => {
  const [cartItems, setCartItems] = React.useState<string[]>(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  React.useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    const value = (event.target as HTMLButtonElement).value;
    const product: Product = JSON.parse(value);
    const isItemInCart = cartItems.some((item) => {
      const parsedItem: Product = JSON.parse(item);
      return parsedItem._id === product._id;
    });
    if (isItemInCart) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => {
          const parsedItem: Product = JSON.parse(item);
          return parsedItem._id !== product._id;
        })
      );
    } else {
      setCartItems((prevItems) => [...prevItems, value]);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, width: "75%", margin: "0 auto" }}>
      <Grid container spacing={2}>
        {products.map((product, index) => {
          const isItemInCart = cartItems.some((item) => {
            const parsedItem: Product = JSON.parse(item);
            return parsedItem._id === product._id;
          });
          const buttonText = isItemInCart ? "Remove from Cart" : "Add to Cart";
          const buttonColor = isItemInCart ? "error" : "success";
          return (
            <Grid item xs={3} key={index}>
              <Item>Product Name: {product.productName}</Item>
              <Item>Price: {product.productPrice}</Item>
              <Button
                variant="outlined"
                color={buttonColor}
                sx={{ margin: "10px auto", width: "100%" }}
                onClick={handleAddToCart}
                value={JSON.stringify(product)}
              >
                {buttonText}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Products;
