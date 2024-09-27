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

//   {
//     "status": 429,
//     "titulo": "Muitas requisições",
//     "detalhes": "Excedido o limite máximo de 3 consultas por minuto. Liberação ocorrerá em Fri Sep 27 2024 09:28:55 GMT-0300 (Brasilia Standard Time)",
//     "validacao": []
// }
