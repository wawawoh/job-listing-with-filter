import "../src/filterList.css";

function FilterList({ filter, removeFilter, clear }) {
  const renderFilter = () => {
    return filter.map((filt, index) => {
      console.log("rendering");
      console.log(filt);
      return (
        <button
          className="actualFilters"
          key={index}
          onClick={() => removeFilter(index)}
        >
          <span className="filt-name">{filt}</span>
          <span className="cross">X</span>
        </button>
      );
    });
  };

  return (
    <>
      {/* condirtional rendiern g */}
      {filter.length !== 0 && (
        <div className="filterList">
          <div className="filterList-Actual">{renderFilter()}</div>

          <button className="clearButton" onClick={() => clear()}>
            Clear
          </button>
        </div>
      )}
    </>
  );
}
// remembe the clear button
export default FilterList;
