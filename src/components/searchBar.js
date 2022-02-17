import "./component-styles/searchBar.css";

const SearchBar = () => {
  return (
    <div className="searchbar">
      <input placeholder="Search for products" />
      <button
        onClick={() => {
          window.location.reload();
        }}
        className="btn"
        type="submit"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
