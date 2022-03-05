import React, { useEffect, useState } from "react";

import { MdSearch as Search } from "react-icons/md";

const SearchComponent = ({ handleSearch }) => {
  const [query, setQuery] = useState("");
  useEffect(() => {
    handleSearch(query);
  }, [query]);
  return (
    <form className="relative w-[300px] mx-3 sm:mx-0">
      <input
        type="text"
        className="w-full rounded-md border-[1px] solid border-[#eee] outline-none px-3  pr-6 py-1 placeholder-[#555]"
        placeholder="Search for a note...."
        onChange={(event) => setQuery(event.target.value)}
        value={query}
      />
      <Search className="absolute text-[#555] top-[0.3rem] right-2 cursor-pointer text-2xl" />
    </form>
  );
};

export default SearchComponent;
