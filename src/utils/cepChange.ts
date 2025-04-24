export const handleCepChange = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
  
    if (cleanCep.length !== 8) return;
  
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();
  
      if (data.erro) {
        console.error("CEP não encontrado");
        return;
      }
  
      // preenche o campo de endereço
      const addressInput = document.getElementById("address") as HTMLInputElement;
      if (addressInput) {
        addressInput.value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
      }
  
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
};