import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/header/Header";
import About from "../Pages/About/About";
import BlogPage from "../Pages/BlogPage/Blogpage";
import Blog from "../Pages/Blogs/Blog";
import PostJob from "../Pages/Form/PostJob";
import Home from "../Pages/Home/Home";
import Hospital from "../Pages/Hospitals/Hospital";
import Jobs from "../Pages/Jobs/Jobs";
import PartnersPage from "../Pages/PartnersPage/PartnersPage";
import Profile from "../Pages/Profile/Profile";
import SignIn from "../Pages/SignIn/SignIn";
import RegisterForm from "../Pages/SignUp/ReisterForm";
import Slideshow from "../Components/Slideshow/Slideshow";
import PostProfile from "../Pages/Form/postProfile";
import ViewMore from "../Pages/Jobs/ViewMore";
import Filter from "../Pages/Jobs/Filter";
import HospitalProfile from "../Pages/Profile/Hospital";
import NotFound from "../Pages/PageNotFound/NotFound";
import HospitalLogin from "../Pages/SignIn/HospitalLogin";
import HospitalRegisterForm from "../Pages/SignUp/HospitalSignup";
import PostDetails from "../Pages/Form/PostDetails";
import Profiles from "../Pages/All_Profiles/Profiles";
import JobDetailsPage from "../Pages/Jobs/JobDetails";
import ForgotPassword from "../Pages/SignIn/ForgotPassword";
import ResetPassword from "../Pages/SignIn/ResetPassword";



function Navigate() {

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/blogs/:id" element={<BlogPage />} />
          <Route exact path="/hospital/:id" element={<Hospital />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/partners" element={<PartnersPage />} />
          <Route exact path="/blogsList" element={<Blog />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<SignIn />} />
          <Route exact path="/jobs" element={<Jobs />}/>
          <Route exact path="/signup" element={<RegisterForm />} />
          <Route exact path="/postJobs" element={<PostJob />} />
          <Route exact path="/header" element={<Header />} />
          <Route exact path="/footer" element={<Footer />} />
          <Route exact path="/slideshow" element={<Slideshow />} />
          <Route exact path="/postProfile" element={<PostProfile />} />
          <Route exact path="/view/job/:id" element={<ViewMore isLoggedIn={sessionStorage.getItem("token")} />} />
          <Route exact path="/filter" element={<Filter />} />
          <Route exact path="/profile/hospital" element={<HospitalProfile />} />
          <Route exact path="/hospital/login" element={<HospitalLogin />} />
          <Route exact path="/hospital/signup" element={<HospitalRegisterForm/>} />
          <Route exact path="/upload/details" element={<PostDetails/>} />
          <Route exact path="/get/profiles" element={<Profiles/>} />
          <Route exact path="/job/details/:id" element={<JobDetailsPage/>} />
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/reset_password/:id/:token" element={<ResetPassword />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <div></div>
      </div>
    </Router>
  );
}

export default Navigate;
