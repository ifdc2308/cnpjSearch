import React from "react";
import ResponsiveAppBar from "../components/AppBar";
import { Container } from "@mui/material";

const Home: React.FC = () => {
  return (
    <>
      <ResponsiveAppBar />
      <p>Pesquisa por CNPJ</p>
    </>
  );
};

export default Home;
