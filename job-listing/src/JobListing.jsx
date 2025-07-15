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
}) {
  const featuredChecker = () => {
    if (featured) {
      return <h4>Featured</h4>;
    }
  };
  const newChecker = () => {
    if (newJob) {
      return <h4>New</h4>;
    }
  };

  return (
    <section>
      <div>
        <div>
          <img src={image} alt="" />
        </div>
        <div>
          <div>
            <h3> {company}</h3>

            {featuredChecker()}
            {newChecker()}
          </div>
          <div>
            <h2>{level}</h2>
          </div>
          <div>
            <span>{posted}</span>
            &bull;
            <span>{contract}</span>
            &bull;
            <span>{location}</span>
          </div>
        </div>
      </div>
      <div>
        {tools.map((tool) => {
          return <button key={tool}>{tool}</button>;
        })}
      </div>
    </section>
  );
}
export default JobListing;
