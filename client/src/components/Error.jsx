import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <h1>404 Error Page</h1>
      <section className="error-container">
        <span>4</span>
        <span>
          <span className="screen-reader-text">0</span>
        </span>
        <span>4</span>
      </section>
      <div class="link-container">
        <Link to="/" className="more-link">
          Visit Homepage
        </Link>
      </div>
    </>
  );
};

export default Error;
