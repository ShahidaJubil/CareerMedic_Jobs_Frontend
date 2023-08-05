import React, { useState, useContext } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import axios from 'axios';

const ProfileSearch = () => {
  const { handleSearch } = useContext(SearchContext);

  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [specialization, setSpecialization] = useState('');

  const handleClear = () => {
    setExperience('');
    setLocation('');
    setSpecialization('');
  };

  return (
    <div>
      <input type="text" placeholder="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input type="text" placeholder="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
      <button onClick={() => handleSearch(experience, location, specialization)}>Search</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default ProfileSearch;
