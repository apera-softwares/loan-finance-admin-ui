export type AmortizationRow = {
  paymentNumber: number;
  interest: number;
  principalPayment: number;
  remainingBalance: number;
  totalDue:number;
};

export function calculateAmortizationRow(
  principal: number,
  annualRate: number,
  months: number
): AmortizationRow[] {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = months;
  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  let remainingBalance = principal;
  const rows: AmortizationRow[] = [];

  for (let i = 1; i <= numPayments; i++) {
    const interest = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interest;
    const totalDue = interest+principalPayment;
    remainingBalance -= principalPayment;
    if (remainingBalance < 0) remainingBalance = 0; // avoid negative value

    rows.push({
      paymentNumber: i,
      interest,
      principalPayment,
      remainingBalance,
      totalDue,
    });
  }

  return rows;
}
