import styles from "./filter.module.css";
export default function Filter({ setSortOrder }) {
  return (
    <div className={styles.sortContainer}>
      <select
        id="sort"
        onChange={(e) => setSortOrder(e.target.value)}
        className={styles.sortDropdown}
      >
        <option value="latest">Sort by latest</option>
        <option value="price-low">Sort by price low</option>
        <option value="price-high">Sort by price high</option>
        <option value="name-asc">Sort by name A to Z</option>
        <option value="name-desc">Sort by name Z to A</option>
      </select>
    </div>
  );
}
