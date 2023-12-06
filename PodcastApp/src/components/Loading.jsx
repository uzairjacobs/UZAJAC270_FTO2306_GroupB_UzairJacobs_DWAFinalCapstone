import React from "react";
import { css } from "@emotion/react";
import { ScaleLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = () => {
  return (
    <div className="loading">
      <h1>Loading...</h1>
      <ScaleLoader color={"#800080"} loading={true} css={override} size={150} />
    </div>
  );
};

export default Loading;
