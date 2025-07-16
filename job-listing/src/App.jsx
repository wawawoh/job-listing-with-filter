import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import "./App.css";
import JobListing from "./JobListing";
import FilterList from "./FilterList";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState("");
  const [displayedList, setDisplayedList] = useState([]);
  const [filter, setFilter] = useState([]);

  const checker = (tempToolKit, filter) => {
    if (filter.length !== 0) {
      console.log("this is the filter", filter);
      console.log("it is going thru the chcekr");
      console.log("the temp tool kit", tempToolKit);
      return filter.every((element) => tempToolKit.includes(element));
    }
  };

  // loaded data with immediatly invoked function
  useEffect(() => {
    // immedicatly ivoked fucntion
    (async function getData() {
      try {
        let response = await fetch("/public/data.json");
        if (!response.ok) {
          throw new Error("bad fethc");
        }
        response = await response.json();
        setData(response);
        setDisplayedList(response);
        setLoaded(true);
      } catch (error) {
        console.error("error" + error);
      }
    })();
  }, []);

  // filtering
  useEffect(() => {
    // loops thru the data
    // creates a temp tool kit and assesses if they match
    if (filter.length !== 0) {
      if (Array.isArray(data)) {
        data.forEach((element) => {
          let tempToolKit = [];
          tempToolKit.push(
            element.role,
            element.level,
            ...element.languages,
            ...element.tools
          );
          // console.log("this is the toolkit for this element", tempToolKit);
          // if the filter fits
          let result = checker(tempToolKit, filter);
          console.log(result);
          if (result === true) {
            setDisplayedList((prev) => [...prev, element]);
          }
        });

        console.log("this is the finished filter", filter);
      }
    } else {
      setDisplayedList(data);
    }
  }, [filter]);

  const addToFilter = (addedFilter) => {
    console.log("this is the added filter", addedFilter);
    if (!filter.includes(addedFilter)) {
      setFilter((prev) => [...prev, addedFilter]);
      setDisplayedList([]);
    }
  };
  const removeFilter = (removedFilter) => {
    // flter the array, takes prev and only filters if index of the current is not equal to the removed filter
    setFilter((prev) => prev.filter((_, index) => index !== removedFilter));
    setDisplayedList([]);
  };
  const clear = () => {
    setFilter([]);
    setDisplayedList(data);
  };

  const displayData = () => {
    return displayedList.map((item, index) => (
      <li key={index}>
        <JobListing
          image={item.logo}
          company={item.company}
          featured={item.featured}
          newJob={item.new}
          level={item.position}
          posted={item.postedAt}
          contract={item.contract}
          location={item.location}
          tools={[item.role, item.level, ...item.languages, ...item.tools]}
          addToFilter={addToFilter}
        />
      </li>
    ));
  };
  return (
    <>
      <header>
        <picture>
          <source
            media="(max-width:800px )"
            srcSet="/images/bg-header-mobile.svg"
          />
          <img src="/images/bg-header-desktop.svg" alt="" />
        </picture>
      </header>

      <FilterList filter={filter} removeFilter={removeFilter} clear={clear} />

      <ul className="job-board">{loaded ? displayData() : "loadingghgf"}</ul>
    </>
  );
}

export default App;
