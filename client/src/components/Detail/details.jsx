import "./detail.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDogById } from "../../redux/action.js";

const Detail = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detail = useSelector((state) => state.detailDog);

  console.log(detail.temperaments);
  useEffect(() => {
    dispatch(getDogById(id));
  }, [id, dispatch]);

  console.log(detail);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="mainDiv">
        <div className="middle">
          <Link to="/Home">
            <div className="goBackButtonDiv">
              <button type="submit" className="goBackButton" title="add dog">
                <i className="fa fa-angle-double-left"></i>
              </button>
            </div>
          </Link>
          <div className="info">
            <h1>Id: {id}</h1>
            <br />
            <h1>{detail[0]?.name ? detail[0]?.name : detail.name}</h1>
            <br />

            <h1>
              Height:{" "}
              {detail[0]?.height?.metric
                ? detail[0]?.height?.metric
                : detail.height}{" "}
              cm
            </h1>

            <br />

            <h1>
              Weight:{" "}
              {detail[0]?.weight?.imperial
                ? detail[0]?.weight?.imperial
                : detail.weight}{" "}
              Lbs
            </h1>

            <br />

            <h1>Temperaments:</h1>
            {detail[0]?.temperament ? (
              <h1>{detail[0]?.temperament}</h1>
            ) : (
              <h1>
                {detail.temperaments?.map((e) => {
                  return e.name + "  ";
                })}
              </h1>
            )}
            <br />
          </div>

          <div
            className="imageBox"
            style={{
              backgroundImage: `url(${
                detail[0]?.image?.url ? detail[0]?.image?.url : detail.image
              })`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Detail;
