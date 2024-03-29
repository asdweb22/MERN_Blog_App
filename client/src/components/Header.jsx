import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { useNavigate } from "react-router-dom";

function Header() {
  //global state managing using redux
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");

  console.log(isLogin);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //state
  const [value, setValue] = useState();

  //handle logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("logout successfull");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4">My Blog App</Typography>
        {isLogin && (
          <>
            <Box display={"flex"} marginLeft="auto" marginRight="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="All Blogs" LinkComponent={Link} to="/all-blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blog"
                />
              </Tabs>
            </Box>
          </>
        )}
        <Box display={"flex"} marginLeft="auto">
          {!isLogin && (
            <>
              <Button
                sx={{ margin: 1, color: "white" }}
                LinkComponent={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                sx={{ margin: 1, color: "white" }}
                LinkComponent={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}
          {isLogin && (
            <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
