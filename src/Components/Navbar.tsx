import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Cart from "./Cart";
import PaymentHistory from "./PaymentHistory";
import { Button } from "@mui/material";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar
          className="nav-items"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h6" noWrap component="div">
            Shopping Website
          </Typography>
          <Toolbar>
            <Button style={{ padding: "10px" }}>
              <PaymentHistory />
            </Button>
            <Cart />
          </Toolbar>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
