import { Header } from "./components/header";
import { jobListings } from "../object/jobListings";
import { useState, useEffect } from "react";
import { JobListing } from "./components/jobListing";
import { InputForm } from "./components/inputForm";

export const JobListings = () => {
  const jobs = JSON.parse(localStorage.getItem("jobListings"));

  const [filters, setFilters] = useState([]);

  const clickHandler = () => {
    setFilters([]);
  };
  const filterClickHandler = (tag) => {
    if (filters.indexOf(tag) === -1) {
      setFilters((prev) => [...prev, tag]);
    }
  };

  const clearFilter = (tag) => {
    const newFilters = filters.filter((item) => item !== tag);
    setFilters(newFilters);
    console.log(tag);
  };

  useEffect(() => {
    const savedJobListings = localStorage.getItem("jobListings");
    if (!savedJobListings) {
      localStorage.setItem("jobListings", JSON.stringify(jobListings));
    }
  }, []);
  return (
    <>
      <Header />
      <div className="body-container">
        {filters.length > 0 && (
          <InputForm
            onClick={clickHandler}
            filters={filters}
            clearFilter={clearFilter}
          />
        )}
        {jobs?.map((jobListing) => {
          let jobTags = [
            jobListing.role,
            jobListing.level,
            ...(jobListing.languages || []),
            ...(jobListing.tools || []),
          ];
          let filterJobs = (jobTags, filters) =>
            filters.every((value) => jobTags.includes(value));

          return filters.length === 0 ? (
            <JobListing
              key={jobListing.id}
              logo={jobListing.logo}
              company={jobListing.company}
              position={jobListing.position}
              postedAt={jobListing.postedAt}
              contract={jobListing.contract}
              location={jobListing.location}
              featured={jobListing.featured}
              newJob={jobListing.new}
              onClick={filterClickHandler}
              jobTags={jobTags}
            />
          ) : (
            filterJobs(jobTags, filters) && (
              <JobListing
                key={jobListing.id}
                logo={jobListing.logo}
                company={jobListing.company}
                position={jobListing.position}
                postedAt={jobListing.postedAt}
                contract={jobListing.contract}
                location={jobListing.location}
                isFeatured={jobListing.featured}
                isNew={jobListing.new}
                onClick={filterClickHandler}
                jobTags={jobTags}
              />
            )
          );
        })}
      </div>
    </>
  );
};
