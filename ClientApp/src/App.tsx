import React from "react";
import Home from "./pages/home";
import { Container } from "@mui/material";

const App: React.FC = () => {
  return (
    <Container maxWidth={false}>
      <Home />
    </Container>
  );
};

export default App;
