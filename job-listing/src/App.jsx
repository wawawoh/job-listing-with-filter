import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import "./App.css";
import JobListing from "./JobListing";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState("");
  const [displayedList, setDisplayedList] = useState([]);
  const [filter, setFilter] = useState([]);
  const checker = (tempToolKit, filter) =>
    filter.every((element) => tempToolKit.includes(element));
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
        setLoaded(true);
      } catch (error) {
        console.error("error" + error);
      }
    })();
  }, []);
  // conaole log the updated data
  useEffect(() => {
    if (data) {
      console.log(data);
      console.log(Array.isArray(data));

      setFilter(["React"]);
    }

    // IT HAS TO BE IN THERE??? BUT IDK WHY
  }, [data]);

  // filtering
  useEffect(() => {
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
        if (result === true) {
          setDisplayedList((prev) => [...prev, element]);
        }
      });
      console.log(displayedList, "this is the finished list");
    }
  }, [filter]);

  const displayData = () => {
    return displayedList.map((item, index) => (
      <li key={index}>
        <JobListing
          image={item.logo}
          company={item.company}
          featured={item.featured}
          newJob={item.new}
          level={item.level}
          posted={item.postedAt}
          contract={item.contract}
          location={item.location}
          tools={[item.role, item.level, ...item.languages, ...item.tools]}
        />
      </li>
    ));
  };
  return (
    <>
      <h1>{loaded ? "loaded" : "still loading"}</h1>
      <ul>{loaded ? displayData() : "loadingghgf"}</ul>
    </>
  );
}

export default App;
