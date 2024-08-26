import React from "react";
import DashboardPage from "./pages/Home";
import { Container } from "@mui/material";

const App: React.FC = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <DashboardPage />
    </Container>
  );
};

export default App;
