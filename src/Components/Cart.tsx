import React, { useState, useEffect } from "react";
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
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";

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
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems =
      JSON.parse(localStorage.getItem("cartItems")!) || [];
    setCartItems(storedCartItems);
  }, [open]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      for (let i = 0; i < cartItems.length; i++) {
        const item = JSON.parse(cartItems[i]);
        const price = item.updatedPrice || item.productPrice;
        total += price;
      }
      setTotalPrice(total);
    };
    calculateTotalPrice();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleIncrement = (index: number) => {
    const updatedCartItems = [...cartItems];
    const item = JSON.parse(updatedCartItems[index]);
    item.updatedQuantity =
      (item.updatedQuantity || item.productQuantity || 1) + 1;
    item.updatedPrice = item.updatedQuantity * item.productPrice;
    updatedCartItems[index] = JSON.stringify(item);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleDecrement = (index: number) => {
    const updatedCartItems = [...cartItems];
    const item = JSON.parse(updatedCartItems[index]);
    if (item.updatedQuantity > 1) {
      item.updatedQuantity = item.updatedQuantity - 1;
      item.updatedPrice = item.updatedQuantity * item.productPrice;
      updatedCartItems[index] = JSON.stringify(item);
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  const handleToken = (token: any) => {
    const data = { token, amount: totalPrice };
    fetch("http://localhost:4444/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        const status = result.status;
        const emailId = result.customer_email_id;
        const amount = result.amount;

        if (status == 200) {
          navigate("/dashboard");
          const payments = localStorage.getItem("payments");
          let paymentsArray = [];

          if (payments) {
            paymentsArray = JSON.parse(payments);
          }

          const newPayment = { emailId: emailId, amount: amount };
          paymentsArray.push(JSON.stringify(newPayment));

          localStorage.setItem("payments", JSON.stringify(paymentsArray));
        } else {
          navigate("error-page");
        }
      });
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
              Your cart is empty!
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
                      updatedQuantity !== undefined && updatedQuantity !== null
                        ? updatedQuantity
                        : productQuantity || 1;

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
                <TableBody>
                  <TableCell colSpan={2} style={{ textAlign: "right" }}>
                    Total:
                  </TableCell>
                  <TableCell>{totalPrice}</TableCell>
                </TableBody>
                <TableBody>
                  <TableCell colSpan={3} style={{ textAlign: "center" }}>
                    <StripeCheckout
                      stripeKey="pk_test_51MlQ9rSBkF0GV1OMdvNLM0fm846jtPwBTVCuGA4m3r693YUcdCbnWzDfLcaYShzpHfN2GcChuB9UI0RFvkQjz8sc00GhJ2Ykj7"
                      token={handleToken}
                      amount={totalPrice * 100}
                    />
                  </TableCell>
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
