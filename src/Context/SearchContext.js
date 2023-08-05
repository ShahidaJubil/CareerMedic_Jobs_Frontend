import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const SearchContext = createContext({});

const SearchProvider = ({ children }) => {
  var [hospitalname, setHospitalname] = useState("");
  var [location, setLocation] = useState("");
  var [specialization, setSpecializaton] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState();
  const [openJobs, setopenJobs] = useState();
  const [noInput, setnoInput] = useState(100);
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const [modal, setModal] = React.useState(false);
  const [modalData, setModalData] = React.useState("");

  const closeModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };

  useEffect(() => {
    const getJobs = async () => {
      setLoading(true);
      const results = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/get/jobs`
      );
      setPosts(results.data);
      setLoading(false);

      if (results.status === 200) {
        setData(results.data);
      }
      console.log("jobs", results);
    };
    getJobs();
  }, []);

  const initSearch = async () => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/get/jobs`
    );
    setResponse(response);
    setLoading(false);

    // if (response.status === 200) {
    //   setData(response.data);
    // }
    // console.log(response);
  };

  function clearResponse() {
    setHospitalname("");
    setLocation("");
    setSpecializaton("");
    setResponse([]);
  }

  const handleSearch = async () => {
    setopenJobs(true);

    if (hospitalname === "" && location === "" && specialization === "") {
      setnoInput(101);
      setModalData("Please fill atleast one field");
      openModal();
    } else {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/searchJobs`,
          {
            params: {
              hospitalname,
              location,
              specialization,
            },
          }
        );

        // props.queryData(response.data);
        // console.log("length",response.data.length);
        if (response.data.length == 0) {
          setModalData("No matches found.");
          openModal();
        }
        setResponse(response.data);
        setPosts(response.data);
        console.log("response CNTXT", response.data);
      } catch (error) {
        setError(error.message);
        setResponse([]);
      }

      setLoading(false);
    }
  };

  function handleHospitalname(data) {
    setHospitalname(data);
  }

  function handleLocation(data) {
    setLocation(data);
  }

  function handleSpecialization(data) {
    setSpecializaton(data);
  }

  return (
    <SearchContext.Provider
      value={{
        handleHospitalname,
        handleLocation,
        handleSpecialization,
        response,
        posts,
        handleSearch,
        initSearch,
        setPosts,
        closeModal,
        openModal,
        modal,
        setModal,
        modalData,
        noInput,
        data,
        clearResponse,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
