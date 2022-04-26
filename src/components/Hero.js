import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import brush from "../assets/bg.svg";

const Hero = () => {
  return (
    <HeroContainer className="section-center">
      <article className="content">
        <h1>
         Design <br />
          your home spaces
        </h1>
        <p>
          Re-imagine your living space, place and position furntiure on the floor plan below to get the best layout.
        </p>
        <button  className="btn hero-btn">
          Try now!
        </button>
      </article>
      <article className="small-hero">
        <img src={brush} alt="paint brush" className="svg" />
      </article>
      <article className="img-container">
        <img src={hero} alt="hero background" className="main-img" />
      </article>
    </HeroContainer>
  );
};

const HeroContainer = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
  .img-container {
    display: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-3);
    font-size: 1rem;
  }
  .small-hero {
    color: var(--clr-primary-9);
    z-index: -1;
    position: absolute;
    overflow: hidden;
  }
  .svg {
    max-width: calc(100vw - 0.1rem);
    min-height: 500px;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .img-container::before {
      content: "";
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-primary-9);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
    .small-hero {
      display:none;
    }
  }
`;

export default Hero;
