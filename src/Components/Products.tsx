import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

interface Product {
  productName: string;
  productPrice: number;
  productCategory: string;
}

interface Response {
  products: Product[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BasicGrid = () => {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:4444/getData", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result: Response) => {
        setProducts(result.products);
        console.log(result.products);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, width: "75%", margin: "0 auto" }}>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={3} key={index}>
            <Item>
              Product Name: {product.productName}
            </Item>
            <Item>
              Price : {product.productPrice}
            </Item>
            <Button
              variant="outlined"
              sx={{ margin: "10px auto", width: "100%" }}
            >
              add to cart
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BasicGrid;
