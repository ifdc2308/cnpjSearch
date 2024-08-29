export const getCNPJ = async (cnpj: string) => {
    const url = `https://publica.cnpj.ws/cnpj/${cnpj}`;
  
    try {
      const response = await fetch(url);
      const empresa = await response.json();
      return empresa;
    } catch (error) {
      throw new Error(
        "Erro ao consultar o CNPJ. Verifique o número e tente novamente."
      );
    }
  };