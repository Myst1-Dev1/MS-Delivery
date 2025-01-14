

const currencyMask = (value: string) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = (parseInt(value, 10) / 100).toFixed(2) + "";
    value = value.replace(".", ",");
    value = value.replace(/(\d)(?=(\d{3})+,)/g, "$1.");
    return `R$ ${value}`;
};

export const handleCurrency = (e: { target: HTMLInputElement | any }) => {
    let input = e.target;
    input.value = currencyMask(input.value);
};