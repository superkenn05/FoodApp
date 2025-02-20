import { useState } from "react";
import styles from "./search.module.css";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ setSearchQuery }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <SearchIcon className={styles.searchIcon} />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for food..."
        className={styles.searchInput}
      ></input>
    </div>
  );
}
