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
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { getCNPJ } from "../services/cnpj";
import imageLogo from "/cnpjSearch/ClientApp/src/assets/logoSearch.png";
import GifArrows from "/cnpjSearch/ClientApp/src/assets/arrows.gif";

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
          p: 2,
          minHeight: "100vh",
        }}
      >
        <Grid
          container
          spacing={1}
          sx={{ display: "flex", alignItems: "center", alignContent: "center" }}
        >
          <Grid item xs={12} md={6}>
            <Box component="img" sx={styles.imageLogo} src={GifArrows}></Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="img" sx={styles.imageLogo} src={imageLogo}></Box>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                backgroundColor: "#e0e0e0",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchClick();
              }}
            >
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
          {empresa ? (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {/* Dados da Empresa */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, mb: 2 }}>
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
                    <strong>Responsável Federativo:</strong>{" "}
                    {empresa.responsavel_federativo || "Não informado"}
                  </Typography>
                  <Typography>
                    <strong>Porte:</strong> {empresa.porte.descricao}
                  </Typography>
                  <Typography>
                    <strong>Natureza Jurídica:</strong>{" "}
                    {empresa.natureza_juridica.descricao}
                  </Typography>
                  <Typography>
                    <strong>Atualizado em:</strong>{" "}
                    {new Date(empresa.atualizado_em).toLocaleDateString()}
                  </Typography>
                </Paper>
              </Grid>

              {/* Dados dos Sócios */}
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
                      <strong>Data de Entrada:</strong>{" "}
                      {new Date(socio.data_entrada).toLocaleDateString()}
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

              {/* Dados do Simples Nacional */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6">Simples Nacional</Typography>
                  <Typography>
                    <strong>Simples:</strong> {empresa.simples.simples}
                  </Typography>
                  <Typography>
                    <strong>Data de Opção pelo Simples:</strong>{" "}
                    {new Date(
                      empresa.simples.data_opcao_simples || "Não informado"
                    ).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    <strong>Data de Exclusão do Simples:</strong>{" "}
                    {new Date(
                      empresa.simples.data_exclusao_simples || "Não informado"
                    ).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    <strong>MEI:</strong> {empresa.simples.mei}
                  </Typography>
                  <Typography>
                    <strong>Atualizado em:</strong>{" "}
                    {new Date(
                      empresa.simples.atualizado_em
                    ).toLocaleDateString()}
                  </Typography>
                </Paper>
              </Grid>

              {/* Atividade Principal */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6">Atividade Principal</Typography>
                  <Typography>
                    <strong>Descrição:</strong>{" "}
                    {empresa.estabelecimento.atividade_principal.descricao}
                  </Typography>
                  <Typography>
                    <strong>ID:</strong>{" "}
                    {empresa.estabelecimento.atividade_principal.id}
                  </Typography>
                  <Typography>
                    <strong>Seção:</strong>{" "}
                    {empresa.estabelecimento.atividade_principal.secao}
                  </Typography>
                </Paper>
              </Grid>

              {/* Estabelecimento - Endereço e Contato */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6">Estabelecimento</Typography>
                  <Typography>
                    <strong>Nome Fantasia:</strong>{" "}
                    {empresa.estabelecimento.nome_fantasia}
                  </Typography>
                  <Typography>
                    <strong>Tipo:</strong> {empresa.estabelecimento.tipo}
                  </Typography>
                  <Typography>
                    <strong>Situação Cadastral:</strong>{" "}
                    {empresa.estabelecimento.situacao_cadastral}
                  </Typography>
                  <Typography>
                    <strong>Data de Situação Cadastral:</strong>{" "}
                    {new Date(
                      empresa.estabelecimento.data_situacao_cadastral
                    ).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    <strong>Início da Atividade:</strong>{" "}
                    {new Date(
                      empresa.estabelecimento.data_inicio_atividade
                    ).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    <strong>Logradouro:</strong>{" "}
                    {empresa.estabelecimento.tipo_logradouro}{" "}
                    {empresa.estabelecimento.logradouro}, Nº{" "}
                    {empresa.estabelecimento.numero},{" "}
                    {empresa.estabelecimento.complemento}
                  </Typography>
                  <Typography>
                    <strong>Bairro:</strong> {empresa.estabelecimento.bairro}
                  </Typography>
                  <Typography>
                    <strong>CEP:</strong> {empresa.estabelecimento.cep}
                  </Typography>
                  <Typography>
                    <strong>Cidade:</strong>{" "}
                    {empresa.estabelecimento.cidade.nome} -{" "}
                    {empresa.estabelecimento.estado.sigla}
                  </Typography>
                  <Typography>
                    <strong>Telefone:</strong> ({empresa.estabelecimento.ddd1}){" "}
                    {empresa.estabelecimento.telefone1}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {empresa.estabelecimento.email}
                  </Typography>
                </Paper>
              </Grid>

              {/* Inscrições Estaduais */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6">Inscrições Estaduais</Typography>
                  {empresa.estabelecimento.inscricoes_estaduais.length > 0 ? (
                    empresa.estabelecimento.inscricoes_estaduais.map(
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
                    )
                  ) : (
                    <Typography>
                      Não há inscrições estaduais registradas.
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
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
    </>
  );
};

export default DashboardPage;

const styles = {
  imageLogo: {
    width: 400,
    height: 400,
  },
};
