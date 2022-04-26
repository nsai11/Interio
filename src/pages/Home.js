import React from "react";
import Hero from "../components/Hero";
import Grid from "../components/grid";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Grid />
    </main>
  );
};

export default Home;
