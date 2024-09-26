import React, { useState } from "react";
import ResponsiveAppBar from "../components/AppBar";
import {
  Container,
  Grid,
  IconButton,
  InputBase,
  Typography,
  Box,
  Modal,
  Stack,
  LinearProgress,
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
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <Grid
          container
          spacing={8}
          sx={{
            minHeight: "90vh", // altura mínima para ocupar 85% da viewport
            display: "flex",
            alignItems: "center", // alinha verticalmente ao centro
            justifyContent: "center", // opcional: centraliza horizontalmente
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              alignItems: "center", // alinha verticalmente ao centro
              justifyContent: "center", // opcional: centraliza horizontalmente
            }}
          >
            <Stack direction={"column"} spacing={5}>
              <Typography variant="h5" sx={styles.title}>
                Consulte informações de uma empresa com a consulta por CNPJ !
              </Typography>
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
            </Stack>
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
          {loading && (
            <Box sx={{ width: "50%", mt: 2 }}>
              <LinearProgress
                sx={{
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#ff735c" },
                }}
              />
            </Box>
          )}
          {error && (
            <Grid item xs={12}>
              <Typography style={{ color: "red" }}>{error}</Typography>{" "}
              {/* Exibe o erro se houver */}
            </Grid>
          )}
          {empresa && (
            <Modal
              open={open}
              onClose={handleClose}
              sx={{ backdropFilter: "blur(2px)" }}
            >
              <InfoCnpjModal empresa={empresa} />
            </Modal>
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
  title: {
    fontWeight: 600,
  },
};
