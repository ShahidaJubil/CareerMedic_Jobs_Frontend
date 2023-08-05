import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const ProfileSearchContext = createContext({});

const ProfileSearchProvider = ({ children }) => {
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);
  const [openJobs, setOpenJobs] = useState(false);
  const [noInput, setNoInput] = useState(100);
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState("");

  const closeModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/profiles/posted`
        );
        if (response.status === 200) {
          setData(response.data);
          setPosts(response.data);
        }
        console.log("resp_profiles-posted", response);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchData();
  }, []);

  const initSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/profiles/posted`
      );
      setResponse(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setResponse([]);
    }
  };

  const clearResponse = () => {
    setExperience("");
    setLocation("");
    setSpecialization("");
    setResponse([]);
  };

  const handleSearch = async () => {
    setOpenJobs(true);

    if (experience === "" && location === "" && specialization === "") {
      setNoInput(101);
      setModalData("Please fill at least one field");
      openModal();
    } else {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/searchProfiles`,
          {
            params: {
              experience,
              location,
              specialization,
            },
          }
        );

        if (response.data.length === 0) {
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
  function handleExperience(data) {
    setExperience(data);
  }

  function handleLocation(data) {
    setLocation(data);
  }

  function handleSpecialization(data) {
    setSpecialization(data);
  }

  return (
    <ProfileSearchContext.Provider
      value={{
        handleSpecialization,
        handleLocation,
        handleExperience,
        experience,
        location,
        specialization,
        setExperience,
        setLocation,
        setSpecialization,
        response,
        posts,
        handleSearch,
        initSearch,
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
    </ProfileSearchContext.Provider>
  );
};

export { ProfileSearchContext, ProfileSearchProvider };
