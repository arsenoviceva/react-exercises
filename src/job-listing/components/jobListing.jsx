import { Container, Row, Col } from "react-bootstrap";

export const JobListing = ({
  company,
  logo,
  newJob,
  featured,
  position,
  postedAt,
  contract,
  location,
  onClick,
  jobTags,
}) => {
  return (
    <Container
      className={`job-listing-container ${
        featured ? "featured-job-border" : ""
      }`}
    >
      <Row className="align-items-center">
        <Col lg={6}>
          <Row>
            <Col lg={2}>
              <img src={logo} />
            </Col>
            <Col lg={10}>
              <div className="d-flex gap-2">
                <p className="company-name"> {company} </p>
                {newJob ? <p className="new-job"> NEW! </p> : ""}
                {featured ? <p className="featured-job"> FEATURED </p> : ""}
              </div>
              <h4 className="position"> {position} </h4>
              <div className="d-flex gap-2">
                <p className="text-muted"> {postedAt} &#x2022; </p>
                <p className="text-muted"> {contract} &#x2022; </p>
                <p className="text-muted"> {location} </p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={6}>
          <div className="d-flex justify-content-end">
            {jobTags.map((tag) => {
              return (
                <button onClick={() => onClick(tag)} className="informations">
                  {tag}
                </button>
              );
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
