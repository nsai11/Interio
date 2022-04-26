import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <ErrorContainer className="error-page">
      <section>
        <h1>404</h1>
        <h3>Page not found</h3>
        <Link to="/" className="btn">
          Back home
        </Link>
      </section>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

export default Error;
