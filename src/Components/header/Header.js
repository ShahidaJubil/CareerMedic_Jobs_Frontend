import React, { useEffect, useState } from "react";
import "./Header.css";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import logo from "../../Assets/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Search from "../Banner/Search";
import axios from "axios";
import { Divider } from "@mui/material";

function Header() {
  const [user, setUser] = useState([]);
  function handleLogout() {
    sessionStorage.clear();
    window.location.reload();
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isSmallScreen = useMediaQuery("(max-width:750px)");

  const [menuAnchor, setMenuAnchor] = useState(null);
  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const id = sessionStorage.getItem("uid");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/profile/" + id
        );
        setUser(response);

        console.log("user header", response);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <Modal open={open} onClose={handleClose}>
        <Box className="searchBox">
          <Search></Search>
        </Box>
      </Modal>

      {isSmallScreen ? (
        <div className="header_open">
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <ViewHeadlineIcon className="close_icon" />
          </IconButton>
          <Menu
            className="menu"
            anchorEl={menuAnchor}
            keepMounted
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuItem className="menu_item">
              <Link to="/" onClick={handleMenuClose}>
                <CloseIcon className="close_icon" />
              </Link>
            </MenuItem>

            <MenuItem className="menu_item">
              <Link to="/">
                <p>Home</p>
              </Link>
            </MenuItem>
            <MenuItem className="menu_item">
              <Link to="/jobs">
                <p>Careers</p>
              </Link>
            </MenuItem>

            <MenuItem className="menu_item">
              <Link to="/about">
                <p>About</p>
              </Link>
            </MenuItem>
            <MenuItem className="menu_item" onClick={handleOpen}>
              <p>Search</p>
            </MenuItem>

            <MenuItem className="menu_item">
              {sessionStorage.getItem("token") ? (
                <>
                  {user?.data?.role === "user" ? (
                    <Link to="/postProfile">
                      <span>Post Profile</span>
                    </Link>
                  ) : (
                    <Link to="/postJobs">
                      <span>Post Job</span>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/login">
                    <span>Post Job/Profile</span>
                  </Link>
                </>
              )}
            </MenuItem>

            <MenuItem className="menu_item">
              {sessionStorage.getItem("token") ? (
                <span onClick={handleLogout}>
                  <b> Logout</b>
                </span>
              ) : (
                ""
              )}
            </MenuItem>
            {sessionStorage.getItem("token") ? (
              <>
                {user?.data?.role === "user" ? (
                  <Link to="/profile">
                    <Button variant="contained" className="btn">
                      {user?.data?.profile?.name} &nbsp; <AccountCircleIcon />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/profile/hospital">
                    <Button variant="contained" className="btn">
                      {user?.data?.name} &nbsp; <AccountCircleIcon />
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <div className="dropdown" style={{backgroundColor:'white',color:'black'}}>
                <span >LOGIN</span>
                <div className="dropdown-content">
                  <div className="dropdown-div">
                    <Link to="/login">
                      <span className="dropdownPost"> User Login</span>
                    </Link>
                  </div>
                
                  <Divider/>
                  <div className="dropdown-div">
                    <Link to="/hospital/login">
                      <span className="dropdownPost">Hospital Login</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            <MenuItem className="menu_item">
              <button className="nav-btn  nav-close-btn"></button>
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <div className="header_btn">
          {sessionStorage.getItem("token") ? (
            <>
              {user?.data?.role === "user" ? (
                <Link to="/jobs">
                  <Button variant="contained" className="btn">
                    CAREERS
                  </Button>
                </Link>
              ) : (
                <Link to="/get/profiles">
                  <Button variant="contained" className="btn">
                    PROFILES
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="contained" className="btn">
                  Careers/profiles
                </Button>
              </Link>
            </>
          )}

        
          <Button variant="contained" className="btn" onClick={handleOpen}>
            <SearchIcon />
          </Button>
          {sessionStorage.getItem("token") ? (
            <>
              {user?.data?.role === "user" ? ( 
                <Link to="/upload/details">
                  <Button variant="contained" className="btn">
                    Post Profile
                  </Button>
                </Link>
              ) : (
                <Link to="/postJobs">
                  <Button variant="contained" className="btn">
                    Post Job
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="contained" className="btn">
                  Post job/profile
                </Button>
              </Link>
            </>
          )}
          &nbsp;&nbsp;
          {sessionStorage.getItem("token") ? (
            <Button variant="contained" className="btn" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            ""
          )}
          {sessionStorage.getItem("token") ? (
            <>
              {user?.data?.role === "user" ? (
                <Link to="/profile">
                  <Button variant="contained" className="btn">
                    {user?.data?.profile?.name} &nbsp; <AccountCircleIcon />
                  </Button>
                </Link>
              ) : (
                <Link to="/profile/hospital">
                  <Button variant="contained" className="btn">
                    {user?.data?.name} &nbsp; <AccountCircleIcon />
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <div className="dropdown">
              <span>LOGIN</span>
              <div className="dropdown-content">
                <div className="dropdown-div">
                  <Link to="/login">
                    <span className="dropdownPost"> User Login</span>
                  </Link>
                </div>
                
                <Divider/>
                <div className="dropdown-div">
                  <Link to="/hospital/login">
                    <span className="dropdownPost">Hospital Login</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
