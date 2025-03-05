import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/authSlice";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const handleLogout = () => {
    dispatch(logout()); 
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 

    navigate("/"); 
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ backgroundColor: "white", color: "black" }}
    >
      <Toolbar sx={{ justifyContent: "flex-start" }}>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          sx={{ 
            color: "black", 
            borderColor: "black", 
            borderWidth: 1, 
            marginRight: 2,
            "&:hover": { backgroundColor: "transparent" } 
          }}
        >
          About us
        </Button>
        {isAuthenticated && (
          <>
            <Button
              component={Link}
              to="/profile"
              variant="outlined"
              sx={{ 
                color: "black", 
                borderColor: "black", 
                borderWidth: 1, 
                marginLeft: 2,
                "&:hover": { backgroundColor: "transparent" } 
              }}
            >
              Profile
            </Button>
          </>
        )}
        {!isAuthenticated ? (
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            sx={{ 
              color: "black", 
              borderColor: "black", 
              borderWidth: 1,
              "&:hover": { backgroundColor: "transparent" } 
            }}
          >
            Sign in
          </Button>
        ) : (
          <Button
            variant="outlined"
            sx={{
              color: "black", 
              borderColor: "black", 
              borderWidth: 1, 
              marginLeft: 2,
              "&:hover": { backgroundColor: "transparent" } 
            }}
            onClick={handleLogout}  
          >
            Sign out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
