import React, { useState } from "react";
import ResponsiveAppBar from "../components/AppBar";
import {
  Container,
  Grid,
  Paper,
  IconButton,
  InputBase,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { getCNPJ } from "../services/cnpj";
import imageLogo from "/cnpjSearch/ClientApp/src/assets/searchAvatar.jpg";
import { Footer } from "../components/Footer";
import { InfoCnpjModal } from "./InfoCnpjModal";

const DashboardPage: React.FC = () => {
  const [cnpj, setCnpj] = useState<string>("");
  const [empresa, setEmpresa] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove todos os caracteres que não são dígitos
      .replace(/^(\d{2})(\d)/, "$1.$2") // Coloca o primeiro ponto
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Coloca o segundo ponto
      .replace(/\.(\d{3})(\d)/, ".$1/$2") // Coloca a barra
      .replace(/(\d{4})(\d)/, "$1-$2") // Coloca o traço
      .slice(0, 18); // Limita a 18 caracteres
  };

  const removeMask = (value: string) => {
    return value.replace(/\D/g, "");
  };

  //modal states
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCNPJ(event.target.value);
    setCnpj(formattedValue);
  };
  const handleSearchClick = async () => {
    try {
      const unmaskedCNPJ = removeMask(cnpj);
      const empresaData = await getCNPJ(unmaskedCNPJ);
      setEmpresa(empresaData);
      setError(null);
      handleOpen();
    } catch (err) {
      setError(
        "Erro ao consultar o CNPJ. Verifique o número e tente novamente."
      );
      setEmpresa(null);
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Container
        maxWidth="lg"
        sx={{
          p: 1,
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Box
              component="form"
              sx={{
                p: "1px 20px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: 10,
                border: "1px solid #000",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchClick();
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="00.000.000/0000-00"
                inputProps={{ "aria-label": "Pesquisar CNPJ" }}
                value={cnpj}
                onChange={handleInputChange}
                required
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={handleSearchClick}
              >
                <Search />
              </IconButton>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Box component="img" sx={styles.imageLogo} src={imageLogo}></Box>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography style={{ color: "red" }}>{error}</Typography>{" "}
              {/* Exibe o erro se houver */}
            </Grid>
          )}
          {empresa ? (
            <Modal
              open={open}
              onClose={handleClose}
              sx={{ backdropFilter: "blur(2px)" }}
            >
              <InfoCnpjModal empresa={empresa} />
            </Modal>
          ) : (
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Grid item xs={12}></Grid>
            </Grid>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default DashboardPage;

const styles = {
  imageLogo: {
    width: 400,
    height: 400,
  },
  modal: {
    top: "50%",
    overflow: "auto",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "#fff",
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
  },
};
