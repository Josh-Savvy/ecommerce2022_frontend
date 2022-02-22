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
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
