import { Grid, Typography, Paper, Box } from "@mui/material";
import { Empresa } from "../interfaces/Empresa";
import { Height } from "@mui/icons-material";

interface InfoCnpjModalProps {
  empresa: Empresa;
}

export const InfoCnpjModal: React.FC<InfoCnpjModalProps> = ({ empresa }) => {
  return (
    <Box sx={styles.modal}>
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
              {new Date(empresa.simples.atualizado_em).toLocaleDateString()}
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
              <strong>Cidade:</strong> {empresa.estabelecimento.cidade.nome} -{" "}
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
                      <strong>Ativo:</strong> {inscricao.ativo ? "Sim" : "Não"}
                    </Typography>
                  </Paper>
                )
              )
            ) : (
              <Typography>Não há inscrições estaduais registradas.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  modal: {
    position: "absolute" as "absolute",
    borderRadius: 5,
    overflow: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 5,
  },
};
