import React, { useState } from "react";
import ResponsiveAppBar from "../components/AppBar";
import {
  Container,
  Grid,
  Paper,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { Search, Menu } from "@mui/icons-material";
import { getCNPJ } from "../services/cnpj";

const DashboardPage: React.FC = () => {
  const [cnpj, setCnpj] = useState<string>("");
  const [empresa, setEmpresa] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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
          p: 3,
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchClick();
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <Menu />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Digitar CNPJ"
                inputProps={{ "aria-label": "Pesquisar CNPJ" }}
                value={cnpj}
                onChange={handleInputChange}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={handleSearchClick}
              >
                <Search />
              </IconButton>
            </Paper>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <p style={{ color: "red" }}>{error}</p>{" "}
              {/* Exibe o erro se houver */}
            </Grid>
          )}
          {empresa && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h6">Dados da Empresa</Typography>
                <Typography>
                  <strong>Razão Social:</strong> {empresa.razao_social}
                </Typography>
                <Typography>
                  <strong>CNPJ Raiz:</strong> {empresa.cnpj_raiz}
                </Typography>
                <Typography>
                  <strong>Capital Social:</strong> {empresa.capital_social}
                </Typography>
                <Typography>
                  <strong>Porte:</strong> {empresa.porte.descricao}
                </Typography>
                <Typography>
                  <strong>Natureza Jurídica:</strong>{" "}
                  {empresa.natureza_juridica.descricao}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Sócios</Typography>
                {empresa.socios.map((socio: any, index: number) => (
                  <Paper key={index} sx={{ p: 2, mb: 2 }}>
                    <Typography>
                      <strong>Nome:</strong> {socio.nome}
                    </Typography>
                    <Typography>
                      <strong>CPF/CNPJ Sócio:</strong> {socio.cpf_cnpj_socio}
                    </Typography>
                    <Typography>
                      <strong>Tipo:</strong> {socio.tipo}
                    </Typography>
                    <Typography>
                      <strong>Data de Entrada:</strong> {socio.data_entrada}
                    </Typography>
                    <Typography>
                      <strong>Qualificação do Sócio:</strong>{" "}
                      {socio.qualificacao_socio.descricao}
                    </Typography>
                    <Typography>
                      <strong>Faixa Etária:</strong> {socio.faixa_etaria}
                    </Typography>
                  </Paper>
                ))}
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Atividades Secundárias</Typography>
                {empresa.estabelecimento.atividades_secundarias.map(
                  (atividade: any, index: number) => (
                    <Paper key={index} sx={{ p: 2, mb: 2 }}>
                      <Typography>
                        <strong>Descrição:</strong> {atividade.descricao}
                      </Typography>
                      <Typography>
                        <strong>ID:</strong> {atividade.id}
                      </Typography>
                      <Typography>
                        <strong>Seção:</strong> {atividade.secao}
                      </Typography>
                    </Paper>
                  )
                )}
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Inscrições Estaduais</Typography>
                {empresa.estabelecimento.inscricoes_estaduais.map(
                  (inscricao: any, index: number) => (
                    <Paper key={index} sx={{ p: 2, mb: 2 }}>
                      <Typography>
                        <strong>Inscrição Estadual:</strong>{" "}
                        {inscricao.inscricao_estadual}
                      </Typography>
                      <Typography>
                        <strong>Estado:</strong> {inscricao.estado.nome} (
                        {inscricao.estado.sigla})
                      </Typography>
                      <Typography>
                        <strong>Ativo:</strong>{" "}
                        {inscricao.ativo ? "Sim" : "Não"}
                      </Typography>
                    </Paper>
                  )
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default DashboardPage;
