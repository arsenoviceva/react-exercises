import { useEffect, useState } from "react";
import { Navbar } from "../posts-list/components/Navbar";
import { PlaceholderCard } from "../posts-list/components/PlaceholderCard";
import { Container, Col, Button } from "react-bootstrap";
import axios from "axios";
import { BACKEND_URL } from "../jJSONExerciseGET/JSONURL";
import { toast } from "react-toastify";
import { PhotoCard } from "./components/PhotoCard";

export const Gallery = () => {
  const [params, setParams] = useState({
    _start: 0,
    _limit: 20,
  });
  const [photos, setPhotos] = useState(undefined);
  const [totalNumber, setTotalNumber] = useState(0);
  const [changedLimit, setChangedLimit] = useState(false);

  const changeLimit = (numToUpdate) => {
    setParams((prev) => ({ ...prev, _limit: numToUpdate }));
  };

  const changeLimitHandler = () => {
    setChangedLimit((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/photos`, {
        params: params,
      })
      .then((response) => {
        setPhotos(response.data);
        setTotalNumber(response?.headers?.["x-total-count"]);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  }, [changedLimit]);
  return (
    <>
      <Navbar activeRoute={"/gallery"} />
      <Container>
        <h2 className="text-center my-3 fw-bold"> Gallery </h2>
        <div className="d-flex justify-content-end gap-2 my-3">
          <input
            className="form-control w-25"
            type="number"
            value={params._limit}
            min="1"
            max={totalNumber}
            step="1"
            onChange={(e) => changeLimit(e?.target?.valueAsNumber)}
          />
          <Button
            className="btn-preview-post w-25"
            onClick={changeLimitHandler}
          >
            Set Filter
          </Button>
        </div>

        {photos === undefined ? (
          <PlaceholderCard length={params._limit} />
        ) : (
          <div className="row align-items-center">
            {photos?.map((photo) => {
              return (
                <Col xl={2} lg={4} mg={6} className="mb-4" key={photo?.id}>
                  <PhotoCard photo={photo} />
                </Col>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
};
