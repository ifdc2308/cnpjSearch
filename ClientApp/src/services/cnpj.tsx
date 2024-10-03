export const getCNPJ = async (cnpj: string) => {
  const url = `https://publica.cnpj.ws/cnpj/${cnpj}`;

  try {
    const response = await fetch(url);

    if (!response?.ok) {
      const errorData = await response?.json();
      throw new Error(
        errorData?.detalhes || "Erro ao consultar o CNPJ. Tente novamente"
      );
    }

    const empresa = await response?.json();
    return empresa;
  } catch (error) {
    throw error;
  }
};