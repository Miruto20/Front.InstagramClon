import { useState } from "react";

const SearchForm = ({ searchParams, setSearchParams }) => {
  const [keyword, setKeyword] = useState(searchParams.get("search") || "");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        setSearchParams(new URLSearchParams({ keyword }));
        setKeyword("");
      }}
    >
      <label htmlFor="search"></label>
      <input
        id="search"
        value={keyword}
        onChange={(event) => {
          setKeyword(event.target.value);
        }}
      />

      <button>Buscar</button>
    </form>
  );
};

export default SearchForm;
