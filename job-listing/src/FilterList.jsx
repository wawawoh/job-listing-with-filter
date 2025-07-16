function FilterList({ filter, removeFilter, clear }) {
  const renderFilter = () => {
    return filter.map((filt, index) => {
      console.log("rendering");
      console.log(filt);
      return (
        <button key={index} onClick={() => removeFilter(index)}>
          {filt}
        </button>
      );
    });
  };
  return (
    <div>
      {filter.length !== 0 ? renderFilter() : null}
      {filter.length !== 0 ? (
        <button onClick={() => clear()}>clear</button>
      ) : null}
    </div>
  );
}
export default FilterList;
