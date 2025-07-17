import "../src/joblisting.css";
function JobListing({
  image,
  company,
  featured,
  newJob,
  level,
  posted,
  contract,
  location,
  tools,
  addToFilter,
}) {
  const featuredChecker = () => {
    if (featured) {
      return <h4 className="featured">Featured</h4>;
    }
  };
  const newChecker = () => {
    if (newJob) {
      return <h4 className="new">New</h4>;
    }
  };

  return (
    <section className={featured ? "job-wrapper special" : "job-wrapper"}>
      <div className="job-information">
        <div className="image">
          <img src={image} alt="" />
        </div>
        <div className="job-details">
          <div className="top-details">
            <h3> {company}</h3>
            {newChecker()}
            {featuredChecker()}
          </div>
          <div className="level">
            <h2>{level}</h2>
          </div>
          <div className="bottom-details">
            <span>{posted}</span>
            &bull;
            <span>{contract}</span>
            &bull;
            <span>{location}</span>
          </div>
        </div>
      </div>
      {screen.width < 980 && <hr />}
      <div className="job-tools">
        {tools.map((tool) => {
          return (
            <button
              className="tools"
              onClick={() => addToFilter(tool)}
              key={tool}
            >
              {tool}
            </button>
          );
        })}
      </div>
    </section>
  );
}
export default JobListing;
