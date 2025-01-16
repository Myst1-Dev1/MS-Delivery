

const currencyMask = (value: string | number) => {
    if (value === null || value === undefined || value === "") return "R$ 0,00";
    const numericValue = parseFloat(
      value.toString().replace(/[^\d]/g, "")
    );
    return `R$ ${(numericValue / 100).toFixed(2).replace(".", ",")}`;
  };
  
  export const handleCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const rawValue = input.value.replace(/[^\d]/g, "");
    const maskedValue = currencyMask(rawValue);
    input.value = maskedValue;
  };