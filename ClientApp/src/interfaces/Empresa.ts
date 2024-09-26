// src/types/Empresa.ts

export interface Empresa {
  razao_social: string;
  cnpj_raiz: string;
  capital_social: string;
  responsavel_federativo?: string;
  porte: {
    descricao: string;
  };
  natureza_juridica: {
    descricao: string;
  };
  atualizado_em: string;
  socios: Array<{
    nome: string;
    cpf_cnpj_socio: string;
    tipo: string;
    data_entrada: string;
    qualificacao_socio: {
      descricao: string;
    };
    faixa_etaria: string;
  }>;
  simples: {
    simples: boolean;
    data_opcao_simples?: string;
    data_exclusao_simples?: string;
    mei: boolean;
    atualizado_em: string;
  };
  estabelecimento: {
    cnpj: string;
    atividade_principal: {
      descricao: string;
      id: string;
      secao: string;
    };
    atividades_secundarias: Array<{
        subclasse: string;
        descricao: string;
    }>;
    nome_fantasia: string;
    tipo: string;
    situacao_cadastral: string;
    data_situacao_cadastral: string;
    data_inicio_atividade: string;
    tipo_logradouro: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cep: string;
    cidade: {
      nome: string;
    };
    estado: {
      sigla: string;
    };
    ddd1: string;
    telefone1: string;
    email: string;
    inscricoes_estaduais: Array<{
      inscricao_estadual: string;
      estado: {
        nome: string;
        sigla: string;
      };
      ativo: boolean;
    }>;
  };
}
