import { React, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { RiPencilFill } from "react-icons/ri";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 6,
  zIndex: 9,
};

export default function UploadResume(props) {
  const id = sessionStorage.getItem("uid");       
                                                  //--------------------- Form for updating profile- not used

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const [activeTab, setActiveTab] = useState("first");
  const [formChanged, setFormChanged] = useState(false);

  const handleFormChange = () => {
    setFormChanged(true);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = createTheme({
    //change
    palette: {
      primary: {
        main: "#6C6D6E",
      },
      secondary: {
        main: "#E32D5D",
      },
      third: {
        main: "	#FFFFFF",
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (fname) formData.append("fname", fname);
    if (lname) formData.append("lname", lname);
    if (email) formData.append("email", email);
    if (location) formData.append("location", location);
    if (phone) formData.append("phone", phone);
    if (image) formData.append("imageData", image);

    await axios
      .put( `${process.env.REACT_APP_BASE_URL}/api/update/` + id, formData, {
        withCredentials: false,
      })
      .then((res) => {
        // console.log("Updated Profile Response", res);
        // console.log("id", id);
        // if (!formChanged) {
        //   return; // Don't show Swal if form hasn't been changed
        // }
        Swal.fire({
          title: "Profile details updated succesfully",
          showCancelButton: false,
          customClass: {
            title: "swalTitle",
            confirmButton: "swalConfirmButton",
          },
          customContainerClass: "swalContainer",
          width: "30%",
        }).then((result) => {
          if (result.isConfirmed) {
            setActiveTab("first"); // Switch to "My Profile" tab
            handleClose(); // Close the modal
          }
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Network Error",
          showCancelButton: false,
        });
      });
  };

  const handleCancelClick = () => {
    handleClose();
  };

  return (
    <div>
        <
            Button variant = "contained"
            className = "btn"
            onClick={handleOpen} >
            { props.status } 
            </Button> 
        
      {/* <RiPencilFill className="profileEdit" onClick={handleOpen} /> */}
      <Modal
        className="profileUpdateForm"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="modalTitle"
          >
            Update your Resume
          </Typography>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <ThemeProvider theme={theme}>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    variant="standard"
                    label="First Name"
                    color="primary"
                    id="fname"
                    focused
                    className="input"
                    onChange={(e) => setFname(e.target.value)}
                  />
                </Grid>
                <br />
                <br />
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    variant="standard"
                    label="Last Name"
                    color="primary"
                    focused
                    className="input"
                    onChange={(e) => setLname(e.target.value)}
                  />
                </Grid>
                <br />
                <br />
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    variant="standard"
                    label="Email"
                    color="primary"
                    focused
                    className="input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    variant="standard"
                    label="Location"
                    color="primary"
                    focused
                    className="input"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <br />
                  <br />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    variant="standard"
                    label="Phone"
                    color="primary"
                    focused
                    className="input"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <br />
                <br />
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    variant="standard"
                    label="Upload Photo"
                    color="primary"
                    type="file"
                    focused
                    className="input"
                    onChange={(e) => setImage(e.target.files[0])}
                    inputProps={{ multiple: true }}
                  />
                  <br />
                  <br />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} className="buttonGrid">
                  <Button
                    variant="contained"
                    className="referCancel"
                    type="button"
                    color="third"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} className="buttonGrid">
                  <Button
                    variant="contained"
                    className="referSubmit"
                    type="submit"
                    color="secondary"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </ThemeProvider>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
