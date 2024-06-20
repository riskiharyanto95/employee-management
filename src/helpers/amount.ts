export function formatAmountToIDR(amount: number): string {
    const formattedAmount = amount.toFixed(2);
    const [integerPart, decimalPart] = formattedAmount.split('.');
    const integerWithDots = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    return `Rp.${integerWithDots},${decimalPart}`;
}

export function formatIDRToAmount(currency: string): number {
    let numberString = currency.replace(/[Rp.\s]/g, '');
    numberString = numberString.replace(',', '.');

    return parseFloat(numberString);
}