import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "@mui/joy";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = React.useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  React.useEffect(() => {
    const storedPayments = JSON.parse(localStorage.getItem("payments")!) || [];
    setPaymentHistory(storedPayments);
  }, [isModalOpen]);

  return (
    <>
      <Link
        color="primary"
        level="body1"
        underline="none"
        variant="outlined"
        component="button"
        onClick={openModal}
      >
        View Payment History
      </Link>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email Id</TableCell>
                  <TableCell>Payment Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentHistory.map((item, index) => {
                  const { emailId, amount } = JSON.parse(item);
                  return (
                    <TableRow key={index}>
                      <TableCell>{emailId}</TableCell>
                      <TableCell>{amount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>
  );
};
export default PaymentHistory;
