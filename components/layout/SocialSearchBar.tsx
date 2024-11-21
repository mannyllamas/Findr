"use client";

import { useState } from "react";
import { Search } from "@mui/icons-material";

interface SocialSearchBarProps {
  onSearchChange: (searchTerm: string) => void;
}

const SocialSearchBar: React.FC<SocialSearchBarProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toLowerCase(); // Convert to lowercase for case-insensitive filtering
    setSearch(newValue);
    onSearchChange(newValue); // Pass updated value to parent
  };

  return (
    <div className="relative py-4">
      <input
        type="text"
        className="search-bar"
        placeholder="Search by name, email, role, major, gender, or interest..."
        value={search}
        onChange={handleChange}
      />
      <Search className="search-icon" />
    </div>
  );
};

export default SocialSearchBar;

// "use client";

// import { useEffect, useState } from "react";
// import { Add, Logout, Person, Search } from "@mui/icons-material";

// interface SocialSearchBarProps {
//   onSearchChange: (searchTerm: string) => void;
// }

// const SocialSearchBar: React.FC<SocialSearchBarProps> = ({ onSearchChange }) => {
//   const [search, setSearch] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value;
//     setSearch(newValue);
//     onSearchChange(newValue); // Call the passed onSearchChange function with the new search term. This value is reference in the "SearchProfileModal" component
//   };

//   return (
//     <div className="relative py-4">
//       <input
//         type="text"
//         className="search-bar"
//         placeholder="Search interns, ..."
//         value={search}
//         onChange={handleChange} // Use the handleChange function here
//       />
//       <Search className="search-icon" onClick={() => { }} />
//     </div>
//   );
// };

// export default SocialSearchBar;

