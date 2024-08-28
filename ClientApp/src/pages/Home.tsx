import React from "react";
import ResponsiveAppBar from "../components/AppBar";
import { Container, Grid, Paper, IconButton, InputBase } from "@mui/material";
import { Search, Menu } from "@mui/icons-material";

const DashboardPage: React.FC = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Container
        maxWidth="lg"
        sx={{
          p: 3,
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <Menu />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Digitar CNPJ"
                inputProps={{ "aria-label": "Pesquisar CNPJ" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <Search />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DashboardPage;
