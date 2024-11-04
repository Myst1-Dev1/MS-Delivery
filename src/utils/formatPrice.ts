

export function FormatPrice(price:number) {
    return Intl.NumberFormat('pt-br', {
        style:'currency',
        currency:'BRL'
    }).format(price);
}