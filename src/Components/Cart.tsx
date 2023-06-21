import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const [open, setOpen] = React.useState(false);
  const cartItems: string[] =
    JSON.parse(localStorage.getItem("cartItems")!) || [];
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleIncrement = (index: number) => {
    const updatedCartItems = [...cartItems];
    const item = JSON.parse(updatedCartItems[index]);
    item.updatedPrice += item.productPrice;
    item.updatedQuantity += item.productQuantity;
    updatedCartItems[index] = JSON.stringify(item);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleDecrement = (index: number) => {
    const updatedCartItems = [...cartItems];
    const item = JSON.parse(updatedCartItems[index]);
    item.updatedPrice -= item.productPrice;
    item.updatedQuantity -= item.productQuantity;
    updatedCartItems[index] = JSON.stringify(item);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return (
    <div>
      <ShoppingCartIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Products in Cart
          </Typography>
          {cartItems.length === 0 ? (
            <Typography variant="body1" component="p" style={{ color: "red" }}>
              Your cart is empty !
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price (in INR)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item, index) => {
                    const {
                      productName,
                      productPrice,
                      updatedPrice,
                      productQuantity,
                      updatedQuantity,
                    } = JSON.parse(item);
                    const displayedPrice =
                      updatedPrice !== undefined ? updatedPrice : productPrice;
                    const displayedQuantity =
                      updatedQuantity !== 1 ? updatedQuantity : productQuantity;

                    return (
                      <TableRow key={index}>
                        <TableCell>{productName}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDecrement(index)}>
                            <RemoveIcon />
                          </IconButton>
                          {displayedQuantity}
                          <IconButton onClick={() => handleIncrement(index)}>
                            <AddIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>{displayedPrice}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
